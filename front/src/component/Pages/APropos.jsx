import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import '../../style/Pages/APropos.css';

function APropos() {
    return (
        <Container className='my-3'>
            <Row>
                <Col xs={12} className="mb-2">
                    <h2 className="titre">À propos de "BoxeSportLorraine" :</h2>
                    <h5 className="texte mx-5">"BoxeSportLorraine" est la nouvelle initiative de la Maison des Ligues de Lorraine (M2L) visant à promouvoir le sport, en particulier la boxe, dans la région. Notre boutique en ligne offre une gamme complète d'équipements de qualité pour tous les niveaux, des débutants aux professionnels.</h5>
                </Col>
                <Col xs={12} className="mb-2">
                    <h2 className="titre">Notre Mission :</h2>
                    <h5 className="texte mx-5">À travers "BoxeSportLorraine", la M2L s'engage à encourager la pratique de la boxe en mettant à disposition des équipements de haute qualité. Les profits générés sont réinvestis dans le développement du sport régional, soutenant ainsi les ligues sportives et les structures hébergées.</h5>
                </Col>
                <Col xs={12} className="mb-2">
                    <h2 className="titre">Notre Sélection :</h2>
                    <h5 className="texte mx-5">Découvrez notre sélection minutieuse d'équipements de boxe, comprenant des gants de différentes catégories, des sacs d'entraînement, des protège-dents, des vêtements de sport et bien plus encore. Nous travaillons en partenariat avec des marques renommées pour vous garantir des produits fiables et performants.</h5>
                </Col>
                <Col xs={12} className="mb-2">
                    <h2 className="titre">Pourquoi choisir "BoxeSportLorraine" :</h2>
                    <h5 className="texte mx-5">
                        <ol>
                            <li>Qualité Garantie : Tous nos produits sont soigneusement sélectionnés pour répondre aux normes de qualité les plus élevées.</li>
                            <li>Engagement Local : En choisissant "BoxeSportLorraine", vous contribuez directement au soutien du sport régional.</li>
                            <li>Service Client Dédié : Notre équipe est là pour répondre à toutes vos questions et vous guider dans le choix des meilleurs équipements.</li>
                        </ol>
                    </h5>
                </Col>
                <Col xs={12} className="mb-2">
                    <h2 className="titre">Comment soutenir le sport régional avec "BoxeSportLorraine" :</h2>
                    <h5 className="texte mx-5">
                        <ol>
                            <li>Faites Vos Achats : Parcourez notre catalogue et trouvez les équipements de boxe qui correspondent à vos besoins.</li>
                            <li>Partagez Notre Initiative : Faites connaître "BoxeSportLorraine" à vos amis, votre famille et à tous les passionnés de boxe.</li>
                            <li>Suivez-Nous sur les Réseaux Sociaux : Restez informé des dernières nouveautés, promotions et événements en nous suivant sur nos pages officielles.</li>
                        </ol>
                    </h5>
                </Col>
                <Col xs={12}>
                    <h1 className="merci">Merci de soutenir "BoxeSportLorraine" et de contribuer au développement du sport dans notre région !</h1>
                </Col>
            </Row>
        </Container>
    );
}

export default APropos;