import React, { Component } from 'react';
import {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,

  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  EmailShareButton,


  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  TelegramIcon,
  EmailIcon
} from 'react-share';


class Share extends Component {
  render() {
    const shareUrl = 'http://github.com';
    const title = 'GitHub';

    return (
      <div className="Share__container u-my-5">
        <div className="Share__network">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Share__network__share-button">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>

          <FacebookShareCount
            url={shareUrl}
            className="Share__network__share-count">
            {count => count}
          </FacebookShareCount>
        </div>

        <div className="Share__network">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Share__network__share-button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>

          <div className="Share__network__share-count">
            &nbsp;
          </div>
        </div>

        <div className="Share__network">
          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="Share__network__share-button">
            <TelegramIcon size={32} round />
          </TelegramShareButton>

          <div className="Share__network__share-count">
            &nbsp;
          </div>
        </div>

        <div className="Share__network">
          <GooglePlusShareButton
            url={shareUrl}
            className="Share__network__share-button">
            <GooglePlusIcon
              size={32}
              round />
          </GooglePlusShareButton>

          <GooglePlusShareCount
            url={shareUrl}
            className="Share__network__share-count">
            {count => count}
          </GooglePlusShareCount>
        </div>

        <div className="Share__network">
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            windowWidth={750}
            windowHeight={600}
            className="Share__network__share-button">
            <LinkedinIcon
              size={32}
              round />
          </LinkedinShareButton>

          <LinkedinShareCount
            url={shareUrl}
            className="Share__network__share-count">
            {count => count}
          </LinkedinShareCount>
        </div>

      </div>
    );
  }
}

export default Share;