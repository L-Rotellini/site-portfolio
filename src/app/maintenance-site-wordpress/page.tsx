import { Footer, Header } from "@/components/Chrome";
import { Card, Logo, Shot, TextShot } from "@/components/media";
import PhoneButton from "@/components/PhoneButton";
import { pageMetadata } from "@/lib/site";

// Prototype : docs/refonte/prototype/Maintenance.html
// Page hors menu : la marque de l'en-tête pointe vers la page elle-même, pas vers l'accueil.
const PATH = "/maintenance-site-wordpress";

export const metadata = pageMetadata({
  path: PATH,
  title: "Maintenance de site WordPress · Louis Rotellini",
  description:
    "Je reprends la maintenance et les mises à jour de votre site WordPress. Une personne, pas une plateforme : vous avez affaire à moi, du premier mail aux mises à jour.",
});

const MAILTO =
  "mailto:louis.rotellini@gmail.com?subject=Maintenance%20de%20notre%20site%20WordPress&body=Bonjour%20Louis%2C%0A%0AAdresse%20de%20notre%20site%20%3A%0ANotre%20prestataire%20actuel%20%3A%0A%0AMerci%2C";

export default function Maintenance() {
  return (
    <>
      <Header brandHref={PATH} brandLabel="Louis Rotellini">
        <a className="btn btn--s" href="#contact">
          M&apos;écrire
        </a>
      </Header>

      <main id="contenu">
        <div className="hero">
          <div className="wrap hero__in">
            <div>
              <h1>Votre prestataire web s&apos;arrête ? Je prends le relais pour votre site.</h1>
              <p className="lede">
                Je reprends la maintenance et les mises à jour de votre site WordPress. Une personne, pas une
                plateforme : vous avez affaire à moi, du premier mail aux mises à jour.
              </p>
            </div>
            <Card role="Développeur web indépendant depuis 2017, à Lille" cta="M'écrire un mail" />
          </div>
        </div>

        <div className="strip">
          <div className="wrap strip__in strip__in--wide">
            <span>Votre site ne change pas</span>
            <span>Vous restez propriétaire</span>
            <span>Un seul interlocuteur</span>
            <span>Sauvegarde avant toute intervention</span>
          </div>
        </div>

        <section aria-labelledby="t-meme">
          <div className="wrap">
            <h2 id="t-meme">Votre site reste le vôtre, tel que vous le connaissez.</h2>
            <p className="intro">Je ne vous impose ni nouvel outil, ni refonte.</p>
            <ul className="rows">
              <li className="row">
                <h3>Votre site</h3>
                <div>
                  <p>
                    Il garde son outil de mise en page : Divi, Elementor ou un autre. Les personnes qui publient vos
                    articles et vos pages continuent, avec leurs accès habituels. Pas de nouveau logiciel à apprendre.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>Un interlocuteur</h3>
                <div>
                  <p>Par mail ou par téléphone, vous parlez toujours à la même personne.</p>
                </div>
              </li>
              <li className="row">
                <h3>L&apos;hébergement</h3>
                <div>
                  <p>
                    L&apos;espace où votre site est stocké est à votre nom. S&apos;il est aujourd&apos;hui à celui de
                    votre prestataire, nous le passons au vôtre ensemble. Chez OVH, o2switch, Ionos ou ailleurs.
                  </p>
                </div>
              </li>
              <li className="row">
                <h3>Le nom de domaine</h3>
                <div>
                  <p>L&apos;adresse de votre site ne change pas, et elle est à votre nom.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="how" aria-labelledby="t-quot">
          <div className="wrap">
            <h2 id="t-quot">Vous m&apos;envoyez vos contenus par mail. Je les mets en ligne.</h2>
            <ol className="steps">
              <li>
                <h3>Vous m&apos;écrivez</h3>
                <p>Un texte, des photos, un PDF : un mail suffit.</p>
              </li>
              <li>
                <h3>Je mets en ligne</h3>
                <p>L&apos;article, la page ou le document, au bon endroit.</p>
              </li>
              <li>
                <h3>Je vous préviens</h3>
                <p>Avec le lien pour vérifier.</p>
              </li>
            </ol>
            <p className="tools">
              <strong>En coulisse, je veille sur votre site :</strong> j&apos;installe les corrections de WordPress et
              de ses extensions, notamment de sécurité, et je fais des sauvegardes régulières, une copie complète pour
              le remettre en état si un problème survient.
            </p>
          </div>
        </section>

        <section aria-labelledby="t-relais">
          <div className="wrap">
            <h2 id="t-relais">Une transition préparée avec votre prestataire actuel.</h2>
            <p className="intro">
              Rien n&apos;est modifié sur votre site avant l&apos;état des lieux et la sauvegarde complète.
            </p>
            <ol className="steps steps--5">
              <li>
                <h3>Un calendrier</h3>
                <p>Fixé ensemble, avec vous et votre prestataire actuel.</p>
              </li>
              <li>
                <h3>Un état des lieux</h3>
                <p>Je regarde votre site, ses réglages et les demandes en cours.</p>
              </li>
              <li>
                <h3>Une sauvegarde complète</h3>
                <p>Une copie de tout votre site, avant ma première intervention.</p>
              </li>
              <li>
                <h3>La remise des accès</h3>
                <p>Votre prestataire me transmet les accès, et reste joignable pendant la transition.</p>
              </li>
              <li>
                <h3>Je prends le relais</h3>
                <p>Vous m&apos;envoyez vos contenus, comme avant.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="alt" aria-labelledby="t-qui">
          <div className="wrap">
            <h2 id="t-qui">Mes références.</h2>
            <p className="intro">
              Développeur web indépendant depuis 2017, je mets en ligne régulièrement des pages à partir des textes que
              mes clients m&apos;envoient.
            </p>
            <ul className="pages">
              <li className="page">
                <TextShot label="wordpress.org" />
                <div>
                  <h3>Deux extensions WordPress publiées</h3>
                  <p>
                    Je publie deux extensions sur l&apos;annuaire officiel de WordPress, sous la marque Antwork. Leur
                    code est public et relu par WordPress.org.
                  </p>
                </div>
                <div className="page__go">
                  <a className="open" href="https://wordpress.org/plugins/antwork-field-editor/">
                    Antwork Field Editor
                  </a>
                  <a className="open" href="https://wordpress.org/plugins/antwork-field-code/">
                    Antwork Field Code
                  </a>
                  <span className="host">wordpress.org</span>
                </div>
              </li>
              <li className="page">
                <Shot src="/travaux/damart-be-fetes-fr.jpg" alt="Capture de la page d'accueil de Damart Belgique" />
                <div>
                  <Logo name="damart" className="page__logo" />
                  <h3>Damart, depuis 2020</h3>
                  <p>Leurs pages de campagne pour la Belgique et le Luxembourg, et des pages de service pour la France.</p>
                </div>
                <div className="page__go">
                  <a className="open" href="https://www.damart.be/fr_be">
                    Ouvrir damart.be
                  </a>
                </div>
              </li>
              <li className="page">
                <Shot
                  src="/travaux/decathlon-rappels-produits.jpg"
                  alt="Capture de la page Rappels produits sur decathlon.fr"
                />
                <div>
                  <Logo name="decathlon" className="page__logo" />
                  <h3>Decathlon, depuis 2023</h3>
                  <p>
                    Les pages qui présentent les offres de nombreux services. J&apos;entretiens aussi plusieurs pages
                    officielles du site, dont les rappels de produits.
                  </p>
                </div>
                <div className="page__go">
                  <a className="open" href="https://www.decathlon.fr/lp/i/rappels-produits">
                    Ouvrir une de ces pages
                  </a>
                </div>
              </li>
              <li className="page">
                <TextShot label="WordPress" />
                <div>
                  <h3>Des sites WordPress entretenus aujourd&apos;hui</h3>
                  <p>Je maintiens des sites WordPress pour mes clients : mises à jour, sauvegardes, formulaires.</p>
                </div>
                <div className="page__go">
                  <a className="open" href="https://quai38-lille.fr/">
                    Quai 38, Lille
                  </a>
                  <a className="open" href="https://www.lespetitesexperiences.com">
                    Les Petites Expériences
                  </a>
                  <a className="open" href="https://www.lespetitesjambes.com">
                    Les Petites Jambes
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="t-contact">
          <div className="wrap">
            <h2 id="t-contact">Parlons de votre site.</h2>
            <p>Un mail ou un appel suffit.</p>
            <a className="bigmail" href={MAILTO}>
              louis.rotellini@gmail.com
            </a>
            <p className="contact__alt">
              <PhoneButton />
            </p>
          </div>
        </section>
      </main>

      <Footer links={[{ href: "/mentions-legales", label: "Mentions légales" }]} />
    </>
  );
}
