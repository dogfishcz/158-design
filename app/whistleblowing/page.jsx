import { Shell } from "@/components/Shell";
import { LegalLayout, LegalSection, LegalList, LegalNote } from "@/components/Legal";
import { WhistleblowingForm } from "@/components/WhistleblowingForm";
import { fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Whistleblowing — MANDÍK a.s.",
  description:
    "Oznamovací systém společnosti MANDÍK, a.s. dle zákona č. 171/2023 Sb. o ochraně oznamovatelů — kdo může oznamovat, co a jak se oznamuje, komunikační kanály a ochrana oznamovatelů.",
};

export default async function Page() {
  const categories = await fetchPortfolio("cs").catch(() => []);

  return (
    <Shell categories={categories}>
      <LegalLayout
        title="Whistleblowing"
        current="Whistleblowing"
        intro="Společnost MANDÍK, a.s. zavedla v souladu se zákonem č. 171/2023 Sb., o ochraně oznamovatelů, oznamovací systém, který umožňuje bezpečně a důvěrně upozornit na protiprávní jednání. Tento systém zajišťuje ochranu oznamovatelů, nahlášených osob i jejich osobních údajů."
      >
        <LegalSection title="Kdo může oznamovat">
          <p>
            Oznámení může podat kdokoliv – učinit jej lze i anonymně. Oznamovatelem (whistleblowerem) je
            osoba, která se v souvislosti s prací nebo jinou obdobnou činností pro společnost dozvěděla
            o možném protiprávním jednání a upozorní na něj.
          </p>
        </LegalSection>

        <LegalSection title="Co se oznamuje">
          <p>
            Oznamuje se porušení nebo hrozící porušení právního předpisu, o kterém se oznamovatel dozvěděl
            v souvislosti s prací nebo jinou obdobnou činností, zejména jednání, které má znaky trestného
            činu nebo přestupku, anebo porušuje právní předpisy České republiky či Evropské unie.
          </p>
        </LegalSection>

        <LegalSection title="Jak se oznamuje">
          <p>
            Oznámení se podává komunikačním kanálem, který zajišťuje důvěrnost poskytovaných informací
            a ochranu oznamovatelů i nahlášených osob a jejich osobních údajů. Oznámení přijímá a posuzuje
            <strong> pověřená osoba – personální manažerka</strong>, která je vázána mlčenlivostí.
          </p>
        </LegalSection>

        <LegalSection title="Komunikační kanál">
          <p>Oznámení můžete podat některým z následujících způsobů:</p>
          <LegalList
            items={[
              <>
                <strong>Písemně poštou:</strong> MANDÍK, a.s., Dobříšská 550, 267 24 Hostomice
                (obálku označte „WHISTLEBLOWING – NEOTVÍRAT“ a adresujte k rukám pověřené osoby)
              </>,
              <>
                <strong>Elektronicky:</strong>{" "}
                <a href="mailto:whistleblowing@mandik.cz" className="text-accent hover:underline">whistleblowing@mandik.cz</a>
              </>,
              <>
                <strong>Osobně:</strong> u pověřené osoby (personální oddělení) po předchozí domluvě
                v přiměřené lhůtě
              </>,
              <><strong>Online formulářem</strong> níže na této stránce</>,
            ]}
          />

          {/* Webový formulář */}
          <div className="pt-2">
            <WhistleblowingForm />
          </div>
        </LegalSection>

        <LegalSection title="Obsah oznámení">
          <p>Aby bylo možné oznámení posoudit, mělo by obsahovat zejména:</p>
          <LegalList
            items={[
              "identifikaci osob či útvarů, kterých se oznámení týká",
              "co nejpopisnější identifikaci protiprávního jednání, kterého se oznámení týká",
            ]}
          />
          <p>Nepovinně lze doplnit:</p>
          <LegalList
            items={[
              "kontaktní údaje oznamovatele pro zpětné vyrozumění",
              "podklady, materiály a důkazy, které oznámení dokládají",
            ]}
          />
        </LegalSection>

        <LegalSection title="Ochrana osob a osobních údajů">
          <p>
            Společnost MANDÍK, a.s. je ze zákona povinna chránit oznamovatele i nahlášenou osobu. Totožnost
            oznamovatele je důvěrná a bez jeho souhlasu není poskytována třetím osobám. Vůči oznamovateli,
            který podá oznámení v dobré víře, nesmí být uplatněna odvetná opatření.
          </p>
          <LegalNote>
            <strong>Upozornění:</strong> Ochrana se nevztahuje na osobu, která podá vědomě nepravdivé oznámení.
          </LegalNote>
        </LegalSection>

        <LegalSection title="Jak bude s oznámením naloženo">
          <p>
            Pověřená osoba potvrdí přijetí oznámení a vyrozumí oznamovatele o výsledku jeho posouzení ve
            lhůtě vhodné pro vyhodnocení jeho obsahu. Oznámení můžete podat také prostřednictvím externího
            oznamovacího systému Ministerstva spravedlnosti ČR na{" "}
            <a href="https://oznamovatel.justice.cz/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
              oznamovatel.justice.cz
            </a>
            .
          </p>
          <p>
            Osobní údaje uvedené v oznámení zpracováváme výhradně za účelem jeho posouzení a v souladu
            s našimi{" "}
            <a href="/ochrana-osobnich-udaju" className="text-accent font-semibold hover:underline">
              zásadami ochrany osobních údajů
            </a>
            .
          </p>
        </LegalSection>
      </LegalLayout>
    </Shell>
  );
}
