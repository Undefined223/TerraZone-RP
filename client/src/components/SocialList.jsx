import React from 'react';
import './styles/SocialList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

const SocialList = () => {
    return (
        <div className="flex-center">
            <a href='https://www.discord.com' target='_blank'> <FontAwesomeIcon icon={faDiscord} className="social-icon discord" /></a>
            <a href='https://www.instagram.com' target='_blank'><FontAwesomeIcon icon={faInstagram} className="social-icon instagram" /></a>
            <a href='https://www.tiktok.com' target='_blank'> <FontAwesomeIcon icon={faTiktok} className="social-icon tiktok" /></a>
            <a href='https://www.youtube.com' target='_blank'><FontAwesomeIcon icon={faYoutube} className="social-icon youtube" /></a>
        </div>
    );
}

export default SocialList;
