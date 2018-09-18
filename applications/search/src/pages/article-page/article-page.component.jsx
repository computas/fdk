import React from 'react';
import DocumentMeta from 'react-document-meta';

import localization from '../../lib/localization';
import './article-page.scss';

export const ArticlePage = () => {
  const meta = {
    title: 'Hvordan komme i gang med registrering av datasett'
  };
  return (
    <div className="container">
      <DocumentMeta {...meta} />
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <h1 className="title">{localization.registration.title}</h1>
          <div className="fdk-subtitle">
            <span>
              Jeg &oslash;nsker tilgang til registreringsl&oslash;sningen for
              min virksomhet
            </span>
          </div>

          <div className="fdk-box fdk-box--white">
            <p
              dangerouslySetInnerHTML={{
                __html:
                  'Din leder må gi deg tilgang til tjenesten "Registrering i datakatalog" og tildele deg rollen "Tilgangsstyring".<br />Kontakt datasettansvarlig i din virksomhet.'
              }}
            />
            <p>
              Når du har fått tilgang, vil din virksomhets datakatalog være
              tilgjengelig etter innlogging.<br />
              <a
                title="Lenke til registreringsløsning"
                target="_blank"
                rel="noopener noreferrer"
                href="https://registrering-fdk.ppe.brreg.no/"
              >
                Logg inn i registreringsløsningen
              </a>
            </p>
          </div>

          <div className="fdk-subtitle">
            Hvordan gjøre en ansatt til datasettansvarlig
            <span className="label label-default ml-1-em">Anbefalt</span>
          </div>

          <div className="fdk-box fdk-box--yellow fdk-box--flex fdk-box--noMargin">
            <i className="fdk-box__icon fa fa-exclamation-circle fa-3x" />

            <div>
              Du må ha rollen <strong>Tilgangsstyring</strong> for din
              virksomhet for å tildele roller og rettigheter til andre.<br />
              Du trenger <strong>fødselsnummer</strong> (11 siffer) og{' '}
              <strong>etternavnet</strong> til den du ønsker å tildele
              rettigheter til.
            </div>
          </div>

          <div className="fdk-box fdk-box--white fdk-box--border">
            <p>
              En <strong>datasettansvarlig</strong> vil ha ansvaret for å gi
              ansatte tilgang til å registrere datasett på vegne av
              virksomheten. Det er anbefalt at dere har en person med dette
              ansvaret, da det forenkler fremtidige tilganger.
            </p>
            <p>
              <strong>Slik går du frem:</strong>
            </p>

            <div className="fdk-box__rowItem fdk-box--flex">
              <div className="fdk-box__rowItem__number">1</div>
              <div className="fdk-box__rowItem__text">
                Logg inn i&nbsp;
                <a
                  title="Lenke til Altinn"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.altinn.no/"
                >
                  Altinn.no
                </a>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      'Velg <strong>"Profil, roller og rettigheter"</strong>.<br />'
                  }}
                />
              </div>
              <div className="fdk-box__rowItem--big">
                <img alt="" src="/static/img/image11.png" title="" />
              </div>
            </div>

            <div className="fdk-box__rowItem fdk-box--flex">
              <div className="fdk-box__rowItem__number">2</div>
              <div
                className="fdk-box__rowItem__text"
                dangerouslySetInnerHTML={{
                  __html:
                    'I nedtrekksmenyen velger du <strong>virksomheten</strong> som du representrerer. Altså den virksomheten som forvalter datakatalogen du oppretter en datasettansvarlig for.'
                }}
              />
              <div className="fdk-box__rowItem--big">
                <img alt="" src="/static/img/image5.png" title="" />
              </div>
            </div>

            <div className="fdk-box__rowItem fdk-box--flex">
              <div className="fdk-box__rowItem__number">3</div>
              <div className="fdk-box__rowItem__text">
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      'Under "Andre med rettigheter til virksomheten" kan du legge til en <strong>ny person.</strong>'
                  }}
                />
                <div className="fdk-box fdk-box--yellow fdk-box--italic">
                  Husk at du trenger fødselsnummer og etternavnet til den du
                  ønsker å legge til.
                </div>
              </div>
              <div className="fdk-box__rowItem--big">
                <img alt="" src="/static/img/image3.png" title="" />
              </div>
            </div>

            <div className="fdk-box__rowItem fdk-box--flex">
              <div className="fdk-box__rowItem__number">4</div>
              <div className="fdk-box__rowItem__text">
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      'Her tildeler du <strong>rolle</strong> til den ansatte. <br />Søk etter roller <strong>Tilgangsstyring</strong>.'
                  }}
                />
                <p>
                  Tilgangsstyring gir datasettansvarlig muligheten til å gi
                  andre ansatte tilgang til registreringsløsningen i fremtiden.
                </p>
              </div>
              <div className="fdk-box__rowItem--big">
                <img alt="" src="/static/img/image2.png" title="" />
              </div>
            </div>

            <div className="fdk-box__rowItem fdk-box--flex">
              <div className="fdk-box__rowItem__number">5</div>
              <div className="fdk-box__rowItem__text">
                <p>
                  Tildel <strong>rettighetene</strong> den ansatte skal ha.
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      'Søk etter <strong>"Registrering i datakatalog"</strong> og gi følgende rettigheter: <br />- Lese <br />- Fylle ut <br />- Signere <br />- Les arkiv <br /><br />Deretter trykker du "Ferdig".'
                  }}
                />
              </div>
              <div className="fdk-box__rowItem--big">
                <img alt="" src="/static/img/image13.png" title="" />
              </div>
            </div>

            <div className="text-center">
              <span>
                Gratulerer! Nå har du opprettet en{' '}
                <strong>datasettansvarlig</strong> for din virksomhet.
              </span>
            </div>
          </div>

          <div className="fdk-subtitle">
            <span>
              Jeg &oslash;nsker å tildele rettigheter til enkeltpersoner manuelt
            </span>
          </div>

          <div className="fdk-box fdk-box--white">
            <p>
              Vi anbefaler at dere bruker en datasettansvarlig som administrerer
              registreringsrettigheter for virksomheten. Dette er forklart over.
            </p>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  'Dersom du allikevel ønsker å tildele rettigheter enkeltvis, følger du stegene som beskrevet over, <strong>unntatt steg 4</strong>, hvor du tildeler roller "Tilgangsstyring".'
              }}
            />
          </div>

          <div className="fdk-subtitle">
            <span>
              Jeg vil importere datasett til registreringsløsningen fra egne
              kilder
            </span>
          </div>

          <div className="fdk-box fdk-box--white">
            <p>
              Registreringsløsningen har en importfunksjon, slik at
              datasettbeskrivelser registrert i andre løsningner kan hentes inn.
              Vi anbefaler deg å gå over datasettene og sørge for at all
              relevant informasjon er oppdatert.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="fdk-box fdk-box--flex fdk-box__feedback">
            <div className="fdk-box fdk-box__feedback__left">
              <div>
                Dette er et samarbeidsprosjekt mellom Brønnøysundregistrene,
                Difi og øvrige SKATE-etater.
              </div>
              <div>
                <a
                  title="Informasjonskapsler og personvern"
                  href="https://www.brreg.no/personvernerklaering/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Informasjonskapsler og personvern
                </a>
              </div>
            </div>

            <div className="fdk-box fdk-box--white fdk-box__feedback__right">
              <div className="fdk-subtitle">
                <strong>Fortell oss hva du synes</strong>
              </div>
              <div className="fdk-box__rowItem fdk-box--mt1 fdk-box--flex">
                <div className="fdk-box__rowItem__number">
                  <i className="fdk-box__icon fa fa-envelope fa-3x" />
                </div>
                <div className="fdk-box__rowItem--big">
                  <p>
                    Vi jobber hele tiden med løsningen og setter derfor stor
                    pris på gode innspill fra publikum!
                  </p>
                  <p>
                    <a
                      className="white-link"
                      href="mailto:fellesdatakatalog@brreg.no"
                    >
                      Send oss gjerne en e-post
                    </a>{' '}
                    med ris, ros eller om morsomme bugs som har klart å gjemme
                    seg fra testerne våre.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
