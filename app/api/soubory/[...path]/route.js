import https from "node:https";
import tls from "node:tls";
import { Readable } from "node:stream";

// Proxy na soubory z mandik.online (obrázky, PDF). Certifikát mandik.online vydal nový
// kořen "GoDaddy TLS Root CA - R1" (2025), který Chrome ani Node zatím neznají, takže
// prohlížeč obrázky přímo nenačte. Kořen je převzatý z úložiště Windows
// (otisk C6FC6A49610C09CB640E250CCB05CDE834660517).
// ponytail: až Chrome a Node kořen přidají, proxy smazat a v lib/api.js odkazovat přímo.
const GODADDY_R1 = `
-----BEGIN CERTIFICATE-----
MIIFWTCCA0GgAwIBAgIRANpi/54mGbElekgJNo7o4/cwDQYJKoZIhvcNAQELBQAwRjELMAkGA1UE
BhMCVVMxFDASBgNVBAoTC0dvRGFkZHkuY29tMSEwHwYDVQQDExhHb0RhZGR5IFRMUyBSb290IENB
IC0gUjEwHhcNMjUwODI4MTIwMDAwWhcNNDAwODI0MTE1OTU5WjBGMQswCQYDVQQGEwJVUzEUMBIG
A1UEChMLR29EYWRkeS5jb20xITAfBgNVBAMTGEdvRGFkZHkgVExTIFJvb3QgQ0EgLSBSMTCCAiIw
DQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAMLrcp3XnknkTvY9I1IzsQA8K/vp5TJRiYsCZWMi
tXxGH+yD1+dPuC5nVzu6BLlXWZ8f7E7cs7lGBUeygeb2CsrESx1uFtB8R3JR4UOAMNE/KrlYFwHB
ydF1JhcttMEEkojBqt9If+Ks8Go2Be4rIAj495yFzArAPc8Ax2kyGgqf9Sl0S1SUbxkuvNRomsb3
uNg+rcSWg4zUVixQijIZm2AIBxNW9gzaghs6dnog6rgqwBYKk7WNhZOfATkq/GHU9glnmiiMMeFP
K2kqo9YNWk17NzEYmrBp6ELJwMwhuupXLifmoOAL2axvkO1ci66WKBxPB5OPgy5WfdhYp7l2Az8d
9MDKWCYwPTpRjwf41AgGKhrwMjEJ+H/tG+wu7vWH0Bk+Bfl2gBtNyGjvObGJHMgJusPASDbWThBa
w4PrA6sKTNPaQCYtVCYi6h/JXB39P2ilTixeC9hiEFmPkwplgjf/t/7CvF6XoCRIFkU2vUYN5WQ9
upLYRTMZIVrHOxHOcxevvbD2jSuIz2ZydWWdwSzoQb8g5/bmhfrXwLPlCAZhhx+E5ljM/OLlkayS
oi35mGE4MVOfld94J7m11UeY76t43RIGW0HF7fwm556C3thd70RZ3KWwSiOBJQGzDMzjY+R53kJn
UljPSlSqDemUE1fsG7evOPgrZSXc8rP2WTAxAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBhjAPBgNV
HRMBAf8EBTADAQH/MB0GA1UdDgQWBBTsUhGVcHMZyN7KSEOXSxw1JCJDUDANBgkqhkiG9w0BAQsF
AAOCAgEAndbUwF1KXURZgNLhfC0UkO0qBS2tHXhqJ2AGVMrOkX2+WFwPZ4jOqDTQoobcOXRBlE6O
eLSGYquyTEW43gWHVy6+UKP1jnBLhpcaib56F5Wp8Fi3eZpT+3MojZEofMtZg7rGJmn6vf1QLztm
66JBb7uh1yVruHZupfT0TXZ8Sbpf8xVVWnq+owgVzTFsfSjWyBps5G9e/IWYfl6r9rmAPmPdo8Lq
xUmJXfjL06RlZ2K7HghBQgefEuBjUkSXFR73SyZHf8IR+CRbwjV0hmhn2NWDos1MB9TLKm/C8HQ4
9acBybtLmsTai+i+RT/N6UB1TNTwTs+eZ42z5Danmw+KDO7JI6m/WrlDOuDkyRmY2TKI8vvEeKHf
aBehGHUMEWQZe2d2AHFvmAonhB10aXUhjAbUMZs4SCo241iuz28FMoVCC6pa07l8A84IRbUfu9OM
RkmmYdmd5Pa4ggfkhtJwFxMbR/3bhsDi8tRwkgS6XNOixXK/azf9TA2RqyOsiiJFjffOxS4nnYkL
tgzqf7hs+Qe3D5UDWUgJyx8AYiwKJIMDlLz+CO8yYIx+YMsKS8jHvclIX5DePkFKKNWCUz5x2wlf
PbXUPhTjsKO2m3F6009Gf4bQgBL60rzBOuo1Wp6fSlDEb9J1nSdKq7qIj1IJ5icFCDhzV+P1LjVv
77My5Rw=
-----END CERTIFICATE-----
`;
// Z iad1 (USA) mandik.online nedostupný (ETIMEDOUT), zkouška z EU.
export const preferredRegion = "fra1";

const CA = [...tls.rootCertificates, GODADDY_R1];
const UPSTREAM = "https://mandik.online/api/v1/downloads/";
const ALLOWED = /^(gallery|public)\/[0-9a-f-]{36}$/;
const PASS_HEADERS = ["content-type", "content-length", "content-disposition", "last-modified", "etag"];

export async function GET(_req, { params }) {
  const path = params.path.join("/");
  if (!ALLOWED.test(path)) return new Response("Not found", { status: 404 });

  return new Promise((resolve) => {
    https
      .get(UPSTREAM + path, { ca: CA }, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return resolve(new Response("Not found", { status: res.statusCode ?? 502 }));
        }
        const headers = { "cache-control": "public, max-age=86400, s-maxage=604800" };
        for (const h of PASS_HEADERS) if (res.headers[h]) headers[h] = res.headers[h];
        resolve(new Response(Readable.toWeb(res), { headers }));
      })
      .on("error", (e) => {
        console.error("soubory proxy", path, e.code, e.message);
        resolve(new Response(`Bad gateway: ${e.code ?? e.message}`, { status: 502 }));
      });
  });
}
