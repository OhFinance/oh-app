import { useActiveWeb3React } from 'hooks/web3';
import React, { useEffect, useState } from 'react';
import { textPink } from '~/constants/tempTailwindConfig';
import { useThemeStore } from '~/stores/useThemeStore';

export function MarketingBody() {
  const { theme } = useThemeStore();
  const { account } = useActiveWeb3React();
  const [marketingHidden, setMarketingHidden] = useState(typeof account === 'string');

  useEffect(() => {
    if (account) {
      setMarketingHidden(true);
    }
  }, [account, setMarketingHidden]);

  return (
    <div
      // Parent Container
      id="marketing-body"
    >
      <div className="flex flex-col items-center py-16">
        <button onClick={() => setMarketingHidden(!marketingHidden)}>
          <img
            className={`p4 ${marketingHidden ? 'transform rotate-180' : ''}`}
            alt="Collapse Marketing Button"
            src="/img/OhFinanceAssets_upArrowButton.png"
            width={64}
            height={64}
          />
        </button>
      </div>
      {!marketingHidden && (
        <div // Collapsible parent
          id="marketing-collapsible"
        >
          <div // Tagline
            className="text-center items-center pt-12 lg:p-32"
          >
            <p className="text-6xl text-defaultText">
              DeFi Made <span className={`text-accentText`}>Easier</span>
            </p>
            <p className="text-3xl text-defaultText pt-16">
              Simply deposit USDC and Oh! Finance aggregates popular DeFi investment strategies and
              automatically compounds your earnings.
            </p>
          </div>

          <div // Marketing Graphics
            className="hidden lg:flex justify-center py-16 lg:py-0"
          >
            <img
              className="px-6"
              alt="Marketing Graphic 1"
              src="/img/simple.png"
              width={200}
              height={200}
            />

            <img
              className="px-6"
              alt="Marketing Graphic 2"
              src="/img/trustless.png"
              width={200}
              height={200}
            />

            <img
              className="px-6"
              alt="Marketing Graphic 3"
              src="/img/non-custodial.png"
              width={200}
              height={200}
            />
          </div>

          <div // Marketing Graphics mobile
            className="lg:hidden py-16 flex flex-col items-center"
          >
            <img
              className="py-6"
              alt="Marketing Graphic 1"
              src="/img/OhFinanceAssets_marketingGraphic1.png"
              width={412}
              height={412}
            />

            <img
              className="py-6"
              alt="Marketing Graphic 2"
              src="/img/OhFinanceAssets_marketingGraphic2.png"
              width={412}
              height={412}
            />

            <img
              className="py-6"
              alt="Marketing Graphic 3"
              src="/img/OhFinanceAssets_marketingGraphic3.png"
              width={412}
              height={412}
            />
          </div>

          <div // How It Works
            className="hidden lg:flex justify-center items-center text-center lg:py-44"
          >
            <img
              width={671}
              height={419}
              className="px-6"
              alt="OH! Does it for you"
              src="/img/OhFinanceAssets_OhSection1Image.png"
            />
            <div className="-mt-20">
              <p className="text-defaultText text-6xl">
                DeFi Done <span className={`text-accentText`}>Better</span>
              </p>
              <p className="text-defaultText text-3xl pt-20">
                Gain exposure to a{' '}
                <span className={`${textPink}`}>managed index of DeFi strategies</span>, designed to
                increase volume exposure and reduce Smart Contract risk.
              </p>
            </div>
          </div>

          <div // How It Works Mobile
            className="lg:hidden justify-center items-center text-center lg:py-44"
          >
            <div className="mt-20">
              <p className="text-defaultText text-6xl">OH! Does it for you</p>
              <p className="text-defaultText text-3xl pt-20">
                Gain exposure to a{' '}
                <span className={`${textPink}`}>managed index of DeFi strategies</span> , designed
                to increase volume exposure and reduce Smart Contract risk.
              </p>
              <img
                width={671}
                height={419}
                className="px-6 pt-12"
                alt="OH! Does it for you"
                src="/img/OhFinanceAssets_OhSection1Image.png"
              />
            </div>
          </div>

          <div // Strategic Partners
            className="bg-partnersBG text-center py-20"
          >
            <p className="text-6xl text-defaultText pb-24">Strategic Partners</p>
            <div className="flex flex-col lg:flex-row justify-center items-center">
              <img
                alt="Bridge Logo"
                src={`/img/OhFinanceAssets_PartnersLogo1_${theme}.png`}
                className="py-12 lg:py-0"
                width={315}
                height={121}
              />
              <img
                alt="Ava Labs Logo"
                src={`/img/OhFinanceAssets_PartnersLogo2_${theme}.png`}
                className="py-12 lg:py-0"
                width={315}
                height={121}
              />
              <img
                alt="Avalance Logo"
                src={`/img/OhFinanceAssets_PartnersLogo3_${theme}.png`}
                className="py-12 lg:py-0"
                width={315}
                height={121}
              />
            </div>

            {/* <p className="text-defaultText text-3xl pt-20">Testimonials</p>
            <p className="text-accentText text-5xl pt-20">
              &quot;Something something amazing so<br className={styles['cta-line-break']}></br>{' '}
              good we are going to the moon!&quot;
            </p>
            <p className="text-accentText text-2xl pt-4">-Satoshi Nakamoto</p> */}
          </div>

          <div // Roadmap
            className="flex-col w-full hidden lg:flex py-20"
          >
            <p className="text-center text-defaultText text-6xl py-20">Roadmap</p>
            <img
              alt="Roadmap"
              src={`/img/OhFinanceAssets_timeline1_${theme}.png`}
              width={1511}
              height={590}
              className={`flex justify-center place-self-center`}
            />
          </div>

          <div // Roadmap mobile
            className="block lg:hidden flex flex-col items-center text-center py-20"
          >
            <p className="text-defaultText text-6xl py-20">Roadmap</p>
            <img
              alt="Roadmap"
              src={`/img/OhFinanceAssets_timeline2_${theme}.png`}
              className="ml-8"
              width={590}
              height={1511}
            />
          </div>
        </div>
      )}
    </div>
  );
}
