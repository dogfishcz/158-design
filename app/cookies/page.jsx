import { Shell } from "@/components/Shell";
import { LegalLayout, LegalSection, LegalList } from "@/components/Legal";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cookies — MANDÍK a.s.",
  description:
    "Zásady používání cookies na webu MANDÍK a.s. — jaké cookies používáme, k čemu slouží a jak je můžete spravovat nebo deaktivovat.",
};

export default async function Page() {
  const categories = await fetchPortfolio("cs").catch(() => []);

  return (
    <Shell categories={categories}>
      <LegalLayout title="Cookies" current="Cookies">
        {/* Rychlé nastavení */}
        <div className="-mt-4 p-5 bg-mandik-paper-soft hairline flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-mandik-steel">Chcete upravit své nastavení cookies?</p>
            <p className="text-sm text-mandik-steel-70 mt-1">
              Klikněte na tlačítko a zobrazí se panel s nastavením, kde můžete svůj souhlas kdykoliv upravit.
            </p>
          </div>
          <CookieSettingsButton />
        </div>

        <LegalSection title="Co jsou Cookies?">
          <p>
            Cookies (soubory cookies) jsou malé textové soubory, které se ukládají ve vašem prohlížeči.
            Tyto soubory napomáhají pamatovat si vaše aktivity a preference, aby se vám web lépe přizpůsobil
            a zlepšil jeho funkčnost.
          </p>
        </LegalSection>

        <LegalSection title="Účel Cookies a souhlas uživatele">
          <p>Používáme cookies k různým účelům:</p>
          <LegalList
            items={[
              <><strong>Technické cookies</strong> – nezbytné pro fungování webu, nevyžadují váš souhlas</>,
              <><strong>Preferenční cookies</strong> – zapamatují si vaše nastavení a preference</>,
              <><strong>Analytické cookies</strong> – pomáhají nám analyzovat, jak web používáte</>,
              <><strong>Marketingové cookies</strong> – slouží k zobrazování vám relevantního obsahu a reklam</>,
            ]}
          />
          <p>
            Některé cookies jsou technicky nezbytné a použijeme je automaticky. Ostatní vyžadují váš výslovný
            souhlas, který můžete udělit nebo odmítnout prostřednictvím cookie lišty na webu.
          </p>
        </LegalSection>

        <LegalSection title="Cookies, které využíváme na našich webových stránkách">
          <p>Na našem webu používáme cookies od těchto třetích stran:</p>
          <LegalList
            items={[
              <>
                <strong>Google Analytics</strong> – analýza návštěvnosti webu{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  (Zásady ochrany osobních údajů)
                </a>
              </>,
              <>
                <strong>Microsoft (Bing)</strong> – sledování konverzí a analýza{" "}
                <a href="https://privacy.microsoft.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  (Zásady ochrany osobních údajů)
                </a>
              </>,
              <>
                <strong>Facebook Pixel</strong> – sledování konverzí a cílení{" "}
                <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  (Zásady ochrany osobních údajů)
                </a>
              </>,
            ]}
          />
        </LegalSection>

        <LegalSection title="Správa a deaktivace Cookies">
          <p>
            Cookies můžete v každém okamžiku spravovat nebo deaktivovat v nastavení svého prohlížeče.
            Zde je postup pro nejčastěji používané prohlížeče:
          </p>

          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-mandik-steel mb-1">Google Chrome</h3>
              <p className="text-[14px]">
                Klikněte na ikonu menu (tři tečky) vpravo nahoře → <strong>Nastavení</strong> →{" "}
                <strong>Ochrana soukromí a zabezpečení</strong> → <strong>Soubory cookie a další data webů</strong>{" "}
                → vyberte požadované nastavení.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-mandik-steel mb-1">Mozilla Firefox</h3>
              <p className="text-[14px]">
                Klikněte na ikonu menu (tři čáry) vpravo nahoře → <strong>Nastavení</strong> →{" "}
                <strong>Soukromí a zabezpečení</strong> → v sekci <strong>Cookies a data stránek</strong>{" "}
                vyberte požadované nastavení.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-mandik-steel mb-1">Microsoft Edge</h3>
              <p className="text-[14px]">
                Klikněte na ikonu menu (tři tečky) vpravo nahoře → <strong>Nastavení</strong> →{" "}
                <strong>Soubory cookie a oprávnění webů</strong> → vyberte požadované nastavení.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-mandik-steel mb-1">Safari</h3>
              <p className="text-[14px]">
                Klikněte na <strong>Safari</strong> v horní nabídce → <strong>Nastavení</strong> →{" "}
                karta <strong>Soukromí</strong> → v sekci <strong>Cookies a data webů</strong> vyberte
                požadované nastavení.
              </p>
            </div>
          </div>
        </LegalSection>

        <LegalSection title="Odvolání souhlasu">
          <p>
            Souhlas s cookies můžete kdykoliv změnit nebo odvolat. Můžete to udělat prostřednictvím
            cookie lišty na našem webu (tlačítko „Nastavení cookies“ vlevo dole) nebo v nastavení svého prohlížeče.
          </p>
        </LegalSection>

        <LegalSection title="Ochrana osobních údajů">
          <p>
            Další informace o tom, jak zpracováváme a chráníme vaše osobní údaje, najdete v našich{" "}
            <a href="/ochrana-osobnich-udaju" className="text-accent font-semibold hover:underline">
              zásadách ochrany osobních údajů
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="Kontakt">
          <p>
            Máte-li jakékoliv otázky ohledně cookies nebo ochrany osobních údajů, kontaktujte nás:
          </p>
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
      </LegalLayout>
    </Shell>
  );
}
