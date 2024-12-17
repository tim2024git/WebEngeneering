import React from 'react';
import '../App.css'; // Optional: Für die CSS-Stile, falls gewünscht
import Header from './Header';
import Footer from './Footer';

function Impressum() {
    return (
        <div className="container mt-5">
            <Header />
            <main className="content">
                <div className="impressum-content">
                    <h2>Impressum</h2>
                    <h3>Angaben gemäß § 5 TMG</h3>
                    <p>
                        Max Mustermann<br />
                        Musterstraße 1<br />
                        12345 Musterstadt
                    </p>

                    <h3>Kontakt</h3>
                    <p>
                        Telefon: +49 (0) 123 456789<br />
                        Telefax: +49 (0) 123 456788<br />
                        E-Mail: <a href="mailto:info@mustermann.de">info@mustermann.de</a>
                    </p>

                    <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
                    <p>
                        Max Mustermann<br />
                        Musterstraße 1<br />
                        12345 Musterstadt
                    </p>

                    <h3>Haftungsausschluss</h3>
                    <h4>Haftung für Inhalte</h4>
                    <p>
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                        Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen,
                        die auf eine rechtswidrige Tätigkeit hinweisen.
                        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
                        Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                    </p>

                    <h4>Haftung für Links</h4>
                    <p>
                        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
                        Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                        Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                        Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                        Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                        Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
                        Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                    </p>

                    <h4>Urheberrecht</h4>
                    <p>
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
                        Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                        Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                        Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.
                        Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                        Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis.
                        Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Impressum;