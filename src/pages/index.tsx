import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import CaptureResize from '~/components/captureResize';
import Chart from '~/components/chart';
import styles from '~/pages/__styles__/index.module.css';
import { getData } from '~/services/chartService';
import { useWalletStore } from '~/stores/useWalletStore';

const h1 = `text-4xl text-white`;
const textPink = `text-pink-500`;
const textCash = `text-4xl ${textPink}`;

const Home: NextPage = React.forwardRef(function Home() {
  const { portfolioBalance, interestEarned } = useWalletStore();
  const chartRef = useRef(null as null | HTMLDivElement);
  const [data, setData] = useState(null as null | unknown[]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData().then((data) => {
      setLoading(false);
      setData(data);
    });
  }, [setLoading, setData]);

  return (
    <main className={`dark:bg-gray-800 bg-white relative overflow-hidden`}>
      <div className={`flex items-center h-auto`}>
        <div
          className={`container mx-auto px-6 flex flex-col justify-between items-center relative py-4`}
        >
          <div className={`flex flex-col`}>
            <h1
              className={`text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2`}
            >
              <span className={`${textPink}`}>Earn More</span> with your{' '}
              <span className={`${textPink}`}>DeFi</span> dollar
            </h1>
          </div>
          <p
            className={`pt-20 text-3xl max-w-3xl justify-center dark:text-white text-gray-800 text-center py-2`}
          >
            Start by earning up to <span className={`${textPink}`}>10-21%</span> APY on USDC
            <br className={styles['cta-line-break']}></br> + a bonus{' '}
            <span className={`${textPink}`}>10-30%*</span> OH! reward in just{' '}
            <span className={`${textPink}`}>two clicks!</span>
          </p>
          <div className={`mt-10 flex flex-col shadow-lg rounded-lg p-10 w-96 bg-black`}>
            <button
              className={`py-1 px-2 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md hover:bg-pink-400`}
            >
              Connect Wallet to get started
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${styles['main-container']} mt-36 mx-auto flex flex-col justify-between shadow-lg rounded-lg bg-black h-auto items-center`}
      >
        <div className={`p-6 flex-col w-full h-full`}>
          <div className={`flex flex-row justify-between`}>
            <div className={`h-auto container flex flex-col justify-between w-1/4 h-auto`}>
              <div className={`h-96 flex flex-row rounded-lg bg-gray-800 bg-opacity-75`}></div>
              <div className={`h-64 mt-4 flex flex-row rounded-lg bg-gray-800 bg-opacity-75`}></div>
            </div>

            <div
              className={`ml-6 h-full container flex flex-col justify-between rounded-lg w-3/4 h-full`}
            >
              <div className={`h-64 flex flex-row rounded-lg bg-pink-800 bg-opacity-20`}>
                <div className={`mt-12 ml-12 w-50 h-full justify-between`}>
                  <h1 className={`${h1}`}>Total Portfolio Balance</h1>
                  <p className={`mt-2 ${textCash}`}>${portfolioBalance}</p>
                  <p className={`${textPink} mt-10`}>
                    ${`${portfolioBalance} OUSDC (Deposited USDC)`}
                  </p>
                </div>
                <div className={`ml-32 mt-12 w-50 h-full flex flex-col`}>
                  <h1 className={`${h1}`}>Total Interest Earned</h1>
                  <p className={`mt-2 ${textCash}`}>${interestEarned}</p>
                  <p className={`${textPink} mt-10`}>
                    ${`${portfolioBalance} OUSDC (Deposited USDC)`}
                  </p>
                </div>
              </div>
              <div
                ref={chartRef}
                className={`${styles['chart-container']} flex flex-col justify-between rounded-lg w-full bg-gray-800 bg-opacity-80`}
              >
                <CaptureResize captureRef={chartRef}>
                  {(size = { width: 0, height: 0 }) => {
                    const { width, height } = size;
                    console.log(width, height);
                    return (
                      <>
                        {isLoading || !width || !height ? (
                          'Loading...'
                        ) : !data ? (
                          'Error fetching data'
                        ) : (
                          <div className="flex w-full h-full p-2 rounded-lg">
                            <Chart width={Math.max(width - 10, 906)} height={height} />
                          </div>
                        )}
                      </>
                    );
                  }}
                </CaptureResize>
              </div>
            </div>
          </div>
          <div className={`flex flex-row justify-between`}></div>
        </div>
      </div>
      <div
        className={`${styles['main-container']} mt-6 mx-auto flex flex-col justify-between shadow-lg rounded-lg bg-black h-auto items-center`}
      >
        <div className={`p-2 flex-col w-full`}>
          <div className={`flex flex-row justify-between`}>
            <div
              className={`h-36 container flex flex-col justify-between rounded-lg w-1/4 h-auto bg-gray-800 opacity-75`}
            ></div>
            <div
              className={`ml-6 h-36 container flex flex-col justify-between rounded-lg w-3/4 h-auto bg-gray-800 opacity-75`}
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
}) as NextPage;

export default Home;
