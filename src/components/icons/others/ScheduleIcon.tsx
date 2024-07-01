import React from "react";
import { IconProps } from "../icon.interface";

const ScheduleIcon = ({
    className = "",
    fillColor = "black",
    onClick,
    title,
      }: IconProps) => {
      return (
          <div title={title ?? ""} onClick={onClick}>
          <svg width="144" height="145" viewBox="0 0 144 145" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.2857 0.650606C28.9391 2.05858 28.1345 4.94156 28.1345 12.1826C28.1345 20.4292 28.872 23.044 31.6209 24.452C34.0346 25.6588 36.5153 25.2566 38.7278 23.2452C40.1358 21.9043 40.2028 21.3008 40.2028 12.9201C40.2028 8.02569 40.0017 3.53359 39.8006 2.93018C38.8619 0.583561 33.8335 -0.824411 31.2857 0.650606Z" fill="black"/>
            <path d="M90.8227 0.717817C88.0738 2.19283 87.8057 3.19853 87.8057 12.652C87.8057 21.301 87.8727 21.9044 89.3477 23.2454C90.2193 24.0499 91.8284 24.8545 92.9682 25.1226C94.6444 25.4579 95.4489 25.1226 97.2592 23.5135C99.5388 21.5021 99.5388 21.4351 99.7399 14.6634C99.874 10.9088 99.8069 6.81903 99.5388 5.4781C98.7342 1.12009 94.3762 -1.29357 90.8227 0.717817Z" fill="black"/>
            <path d="M6.81381 13.1214C3.93082 14.5294 1.51715 17.4794 0.645553 20.6306C-0.226048 23.9829 -0.226048 117.244 0.712599 120.731C1.51715 123.882 4.3331 127.234 7.14904 128.374C8.89224 129.111 16.2673 129.312 44.2256 129.312H79.0896V122.943V116.574H44.8961H10.7025V78.0221V39.4706H62.9986H115.295V59.5844V79.6983H120.658H126.022V49.9968C126.022 20.5635 126.022 20.3624 124.48 17.7476C123.541 16.0714 121.865 14.5294 120.055 13.5237C117.44 12.1827 116.166 11.9816 109.529 11.9816H102.019L101.751 17.3453C101.55 22.3067 101.416 22.8431 99.4717 24.7874C97.9296 26.3295 96.5887 26.9329 94.4432 27.2011C88.4761 27.7375 85.1238 23.9158 85.1238 16.6078V11.9816H64.0042H42.8847V16.0044C42.8847 18.2169 42.4824 21.0999 41.946 22.3738C39.7335 27.6704 32.6937 28.9443 28.5368 24.7874C26.5924 22.8431 26.4584 22.3067 26.2572 17.3453L25.989 11.9816H17.4742C11.1048 11.9816 8.48996 12.2498 6.81381 13.1214Z" fill="black"/>
            <path d="M19.4185 56.2318V64.2773H27.464H35.5096V56.2318V48.1862H27.464H19.4185V56.2318Z" fill="black"/>
            <path d="M42.8845 56.2318V64.2773H51.2653H59.6461V56.2318V48.1862H51.2653H42.8845V56.2318Z" fill="black"/>
            <path d="M67.0215 56.2318V64.2773H75.067H83.1126V56.2318V48.1862H75.067H67.0215V56.2318Z" fill="black"/>
            <path d="M90.4878 56.2318V64.2773H98.8686H107.249V56.2318V48.1862H98.8686H90.4878V56.2318Z" fill="black"/>
            <path d="M19.4185 79.0267V87.0723H27.464H35.5096V79.0267V70.9812H27.464H19.4185V79.0267Z" fill="black"/>
            <path d="M43.0188 78.8259L43.2199 86.7374L51.4666 86.9385L59.6462 87.1396V79.0271V70.9815H51.2655H42.8176L43.0188 78.8259Z" fill="black"/>
            <path d="M67.0215 79.0267V87.0723H75.067H83.1126V79.0267V70.9812H75.067H67.0215V79.0267Z" fill="black"/>
            <path d="M90.4878 79.0267V87.0723H98.4663H106.445L106.847 84.9938C107.048 83.854 107.249 80.2336 107.249 76.9483V70.9812H98.8686H90.4878V79.0267Z" fill="black"/>
            <path d="M109.26 90.6934C104.433 92.0344 100.544 94.3139 96.8568 98.0685C85.9953 108.93 86.2635 126.63 97.5273 137.291C99.5387 139.235 102.958 141.582 105.036 142.587C108.523 144.196 109.663 144.397 116.3 144.397C123.139 144.397 124.011 144.263 128.1 142.319C142.113 135.681 148.013 118.853 141.107 105.108C139.096 100.952 134.269 95.7889 130.38 93.5094C124.413 89.9559 115.898 88.8832 109.26 90.6934ZM124.279 97.1299C135.207 101.22 140.839 113.958 136.682 124.954C134.671 130.385 129.106 136.017 124.011 137.76C118.714 139.503 112.412 139.302 107.785 137.224C102.623 134.81 99.5387 131.86 97.058 126.764C95.1136 122.876 94.8454 121.602 94.8454 117.177C94.8454 112.819 95.1807 111.478 97.058 107.656C99.4716 102.762 103.964 98.6719 108.992 96.8617C112.948 95.3867 119.921 95.5208 124.279 97.1299Z" fill="black"/>
            <path d="M114.356 99.543C113.485 100.348 113.283 102.225 113.283 108.862C113.283 113.422 113.485 117.646 113.686 118.182C113.887 118.785 116.971 120.931 120.457 123.009C127.363 127.099 130.179 127.568 130.581 124.752C130.917 122.607 129.978 121.668 124.279 118.517L119.318 115.835V107.924C119.318 99.8783 118.915 98.4703 116.569 98.4703C115.898 98.4703 114.893 98.9396 114.356 99.543Z" fill="black"/>
            <path d="M19.4185 101.153V109.198H27.464H35.5096V101.153V93.1071H27.464H19.4185V101.153Z" fill="black"/>
            <path d="M43.3538 93.5765C43.0857 93.7776 42.8845 97.3981 42.8845 101.622V109.198H51.2653H59.6461V101.153V93.1071H51.7346C47.3766 93.1071 43.555 93.3083 43.3538 93.5765Z" fill="black"/>
            <path d="M67.0215 101.153V109.198H75.067H83.1126V101.153V93.1071H75.067H67.0215V101.153Z" fill="black"/>
            </svg>

          </div>
      );
  };
  
  export default ScheduleIcon;
  