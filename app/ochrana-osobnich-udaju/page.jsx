import { Shell } from "@/components/Shell";
import { LegalLayout, LegalSection, LegalList, LegalNote } from "@/components/Legal";
import { fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ochrana osobních údajů, MANDÍK a.s.",
  description:
    "Zásady zpracování a ochrany osobních údajů společnosti MANDÍK, a.s. v souladu s nařízením GDPR, kategorie údajů, právní důvody, doba uložení a vaše práva.",
};

export default async function Page() {
  const categories = await fetchPortfolio("cs").catch(() => []);

  return (
    <Shell categories={categories}>
      <LegalLayout
        title="Ochrana osobních údajů"
        current="Ochrana osobních údajů"
        intro="Společnost MANDÍK, a.s. vás tímto informuje o tom, jak zpracovává vaše osobní údaje v souladu s nařízením Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů (GDPR)."
      >
        <LegalSection title="Základní informace">
          <p>
            Společnost <strong>MANDÍK, a.s.</strong> (IČO: 26718405) se sídlem na adrese{" "}
            <strong>Dobříšská 550, 267 24 Hostomice</strong>, Česká republika, vás tímto informuje o tom,
            jak zpracováváme vaše osobní údaje v souladu s nařízením Evropského parlamentu a Rady (EU)
            2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů (GDPR).
          </p>
        </LegalSection>

        <LegalSection title="Kontaktní údaje">
          <p>Máte-li dotazy ohledně zpracování vašich osobních údajů, kontaktujte nás:</p>
          <p>
            <strong>MANDÍK, a.s.</strong>
            <br />
            Dobříšská 550, 267 24 Hostomice
            <br />
            Telefon:{" "}
            <a href="tel:+420311706706" className="text-accent hover:underline">+420 311 706 706</a>
            <br />
            E-mail:{" "}
            <a href="mailto:mandik@mandik.cz" className="text-accent hover:underline">mandik@mandik.cz</a>
          </p>
        </LegalSection>

        <LegalSection title="Zásady zpracování osobních údajů">
          <p>Při zpracování osobních údajů se řídíme těmito sedmi základními zásadami:</p>
          <LegalList
            items={[
              <><strong>Zákonnost a transparentnost</strong>, zpracování je vždy v souladu se zákonem a jasně vám sdělujeme, co s vašimi údaji děláme</>,
              <><strong>Účelové omezení</strong>, údaje zpracováváme pouze pro jasně definované účely</>,
              <><strong>Minimalizace údajů</strong>, sbíráme pouze údaje, které jsou pro daný účel nezbytné</>,
              <><strong>Přesnost</strong>, zajišťujeme, aby údaje byly správné a aktuální</>,
              <><strong>Omezení doby uložení</strong>, údaje neuchováváme déle, než je nutné</>,
              <><strong>Integrita a důvěrnost</strong>, chráníme údaje před neoprávněným přístupem a zneužitím</>,
              <><strong>Odpovědnost</strong>, provádíme technická a organizační opatření k ochraně údajů</>,
            ]}
          />
        </LegalSection>

        <LegalSection title="Kategorie zpracovávaných údajů">
          <p>Zpracováváme následující kategorie osobních údajů:</p>
          <LegalList
            items={[
              "Identifikační údaje (jméno, příjmení, datum narození)",
              "Kontaktní údaje (adresa, telefonní číslo, e-mailová adresa)",
              "Ověřovací data (hesla, bezpečnostní otázky)",
              "Finanční a platební údaje (číslo účtu, údaje o platbách)",
              "Údaje o právních nárocích (smlouvy, objednávky, faktury)",
              "Profesní údaje (pracovní pozice, kvalifikace)",
              "Technické údaje (IP adresa, typ prohlížeče, cookies)",
              "Údaje o komunikaci (historie korespondence)",
              "Údaje o lokaci (při poskytnutí souhlasu)",
              "Údaje z veřejných zdrojů (registrované obchodní údaje)",
              "Biometrické údaje (pouze pokud jsou poskytnuty)",
              "Údaje o trestních záznamech (pouze v rámci nezbytných bezpečnostních kontrol)",
            ]}
          />
          <LegalNote>
            <strong>Poznámka:</strong> Je možné, že o vás zpracováváme i další osobní údaje zde výslovně
            neuvedené, pokud je to nezbytné pro náš oprávněný účel.
          </LegalNote>
        </LegalSection>

        <LegalSection title="Právní důvody zpracování">
          <p>Vaše osobní údaje zpracováváme na základě jednoho z těchto právních důvodů:</p>
          <LegalList
            ordered
            items={[
              <><strong>Plnění smlouvy</strong>, zpracování je nezbytné pro plnění smlouvy, kterou s námi máte (např. objednávka, služba)</>,
              <><strong>Plnění právní povinnosti</strong>, zpracování je vyžadováno právními předpisy (daňové, účetní povinnosti)</>,
              <><strong>Oprávněné zájmy</strong>, zpracování slouží našim oprávněným zájmům nebo zájmům třetích stran (marketing, bezpečnost)</>,
              <><strong>Souhlas subjektu údajů</strong>, udělili jste nám svůj výslovný souhlas se zpracováním (cookies, newsletter)</>,
              <><strong>Ochrana životně důležitých zájmů</strong>, zpracování je nezbytné pro ochranu života nebo zdraví</>,
            ]}
          />
        </LegalSection>

        <LegalSection title="Příjemci osobních údajů">
          <p>Vaše osobní údaje mohou být předány následujícím kategoriím třetích osob:</p>
          <LegalList
            items={[
              <><strong>Zpracovatelé</strong>, třetí strany, které údaje zpracovávají na náš účet (hostingové služby, platební brány)</>,
              <><strong>Samostatní správci</strong>, organizace, které jsou samostatnými správci údajů (finanční úřad, zákonem pověřené orgány)</>,
              <><strong>Právní nástupci</strong>, v případě prodeje nebo fúze společnosti</>,
              <><strong>Orgány činné v trestním řízení</strong>, pokud vyžadují údaje pro vyšetřování trestného činu</>,
            ]}
          />
          <p>
            Údaje předáváme pouze v rozsahu a za účelem nezbytném pro plnění smlouvy, právní povinnosti
            nebo zpracování údajů.
          </p>
        </LegalSection>

        <LegalSection title="Doba uložení údajů">
          <p>Vaše osobní údaje uchováváme pouze po dobu, která je pro daný účel nezbytná:</p>
          <LegalList
            items={[
              <><strong>Právní povinnosti</strong>, určeno právními předpisy (např. účetní doklady se archivují po dobu až 11 let)</>,
              <><strong>Smluvní údaje</strong>, uchováváme po dobu trvání smlouvy a dalších 10 let</>,
              <><strong>Oprávněné zájmy</strong>, od 1 týdne do 10 let v závislosti na účelu zpracování</>,
              <><strong>Souhlas</strong>, do odvolání souhlasu a následného smazání</>,
            ]}
          />
          <p>Po skončení doby uložení údaje smažeme nebo anonymizujeme.</p>
        </LegalSection>

        <LegalSection title="Vaše práva subjektů údajů">
          <p>V souladu s GDPR máte následující práva:</p>
          <LegalList
            items={[
              <><strong>Právo na přístup</strong>, máte právo vědět, jaké údaje o vás zpracováváme</>,
              <><strong>Právo na opravu</strong>, můžete nás požádat o opravu nepřesných údajů</>,
              <><strong>Právo na výmaz</strong>, máte právo být zapomenut (právo na výmaz)</>,
              <><strong>Právo na omezení zpracování</strong>, můžete požádat o omezení zpracování vašich údajů</>,
              <><strong>Právo na přenositelnost údajů</strong>, máte právo obdržet své údaje ve strojově čitelné podobě</>,
              <><strong>Právo vznést námitku</strong>, v určitých případech můžete vznést námitku proti zpracování vašich údajů</>,
              <><strong>Právo odvolat souhlas</strong>, souhlas se zpracováním můžete kdykoliv odvolat</>,
              <><strong>Právo na náhradu újmy</strong>, máte právo na náhradu újmy způsobené nezákonným zpracováním</>,
              <><strong>Právo podat stížnost</strong>, stížnost můžete podat Úřadu pro ochranu osobních údajů</>,
            ]}
          />
        </LegalSection>

        <LegalSection title="Jak uplatnit vaše práva">
          <p>
            Chcete-li uplatnit některé z výše uvedených práv, zašlete nám písemný požadavek na následující adresy:
          </p>
          <p>
            <strong>Poštou:</strong>
            <br />
            MANDÍK, a.s.
            <br />
            Dobříšská 550
            <br />
            267 24 Hostomice
            <br />
            Česká republika
          </p>
          <p>
            <strong>Elektronicky:</strong>
            <br />
            E-mail:{" "}
            <a href="mailto:mandik@mandik.cz" className="text-accent hover:underline">mandik@mandik.cz</a>
            <br />
            Telefon:{" "}
            <a href="tel:+420311706706" className="text-accent hover:underline">+420 311 706 706</a>
          </p>
          <p>
            Vaši žádost vyřídíme bez zbytečného odkladu, nejpozději do 1 měsíce. V případě, že bude žádost
            složitá, můžeme lhůtu prodloužit o další 2 měsíce.
          </p>
        </LegalSection>

        <LegalSection title="Cookies">
          <p>
            Detailní informace o cookies, které na našem webu používáme, a o tom, jak je můžete spravovat,
            najdete v našich{" "}
            <a href="/cookies" className="text-accent font-semibold hover:underline">zásadách o cookies</a>.
          </p>
        </LegalSection>

        <LegalSection title="Předávání do třetích zemí">
          <p>
            Vaše osobní údaje se standardně do zemí mimo Evropský hospodářský prostor nepředávají. V případě,
            že by k takovému předání došlo, zajistíme splnění příslušných ochranných opatření v souladu s GDPR,
            jako jsou:
          </p>
          <LegalList
            items={[
              "Rozhodnutí Evropské komise o odpovídající úrovni ochrany",
              "Vhodné záruky (standardní smluvní doložky)",
              "Výjimky pro specifické situace",
            ]}
          />
        </LegalSection>

        <LegalSection title="Bezpečnost údajů">
          <p>
            Zavedli jsme technická a organizační opatření k ochraně vašich osobních údajů proti neoprávněnému
            přístupu, zničení, změně, zveřejnění nebo ztrátě, včetně:
          </p>
          <LegalList
            items={[
              "Šifrování údajů při přenosu i v klidu",
              "Přístupu řídícího se principem nejmenších oprávnění",
              "Pravidelného testování bezpečnosti",
              "Školení zaměstnanců v oblasti ochrany dat",
              "Plánů pro řešení bezpečnostních incidentů",
            ]}
          />
        </LegalSection>

        <LegalSection title="Kontakt na Úřad pro ochranu osobních údajů">
          <p>
            Máte-li pocit, že došlo k porušení ochrany vašich osobních údajů, můžete podat stížnost:
          </p>
          <p>
            <strong>Úřad pro ochranu osobních údajů</strong>
            <br />
            Pplk. Sochora 27
            <br />
            170 00 Praha 7
            <br />
            Česká republika
            <br />
            Web:{" "}
            <a href="https://www.uoou.cz/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              www.uoou.cz
            </a>
          </p>
        </LegalSection>

        <LegalSection title="Poslední aktualizace">
          <p className="text-mandik-steel-70">
            Tyto zásady ochrany osobních údajů byly naposledy aktualizovány v lednu 2024. Vyhrazujeme si
            právo je měnit. O všech podstatných změnách vás budeme informovat.
          </p>
        </LegalSection>
      </LegalLayout>
    </Shell>
  );
}
