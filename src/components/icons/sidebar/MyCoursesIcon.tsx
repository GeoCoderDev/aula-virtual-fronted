
import { IconProps } from "../icon.interface";

const MyCoursesIcon = ({ fillColor="black", className }: IconProps) => {
  return (
    <svg
      className={className}
      width="45"
      height="33"
      viewBox="0 0 45 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.3554 0.160234C23.4063 0.178965 23.4573 0.197696 23.5098 0.216995C23.6192 0.257274 23.7284 0.297905 23.8375 0.338855C24.1294 0.448358 24.4222 0.555227 24.7149 0.66257C24.7738 0.684253 24.8327 0.705935 24.8933 0.728275C25.4039 0.915975 25.9172 1.09391 26.4323 1.26801C27.2508 1.54559 28.0672 1.82892 28.8828 2.11523C28.9432 2.13644 29.0036 2.15765 29.0659 2.17951C29.3749 2.28798 29.6839 2.39652 29.9929 2.50508C30.5345 2.69531 31.0762 2.88504 31.6179 3.0748C31.9161 3.17928 32.2143 3.28379 32.5125 3.3883C32.6319 3.43014 32.7513 3.47198 32.8707 3.51381C33.1095 3.59749 33.3483 3.68117 33.5871 3.76484C33.6462 3.78555 33.7053 3.80626 33.7662 3.8276C33.8855 3.86943 34.0049 3.91127 34.1243 3.9531C34.4229 4.05775 34.7216 4.16241 35.0202 4.26706C35.5555 4.45464 36.0908 4.64223 36.6261 4.82987C36.922 4.93359 37.218 5.0373 37.5139 5.14101C37.5724 5.16154 37.631 5.18206 37.6913 5.2032C38.4419 5.46628 39.1926 5.72909 39.9434 5.99152C40.2703 6.1058 40.5972 6.22015 40.924 6.33473C41.0506 6.37911 41.1773 6.4235 41.3039 6.46788C41.3964 6.50029 41.3964 6.50029 41.4907 6.53335C41.8427 6.6566 42.1951 6.77894 42.5477 6.90029C42.7565 6.97219 42.9651 7.04455 43.1737 7.11698C43.269 7.14993 43.3644 7.18265 43.4598 7.21514C43.5897 7.25937 43.7194 7.30444 43.849 7.34956C43.9569 7.38661 43.9569 7.38661 44.067 7.42441C44.4377 7.58408 44.7698 7.79443 44.97 8.15783C45.0271 8.51478 45.0099 8.79005 44.8564 9.11712C44.5698 9.4422 44.2442 9.61906 43.8447 9.76262C43.7613 9.79284 43.6779 9.82305 43.592 9.85418C43.501 9.88645 43.4099 9.91868 43.3189 9.95089C43.2224 9.98548 43.126 10.0201 43.0296 10.0547C42.2139 10.3467 41.3943 10.6269 40.5742 10.9056C39.7739 11.1777 38.9754 11.4549 38.1778 11.735C38.0883 11.7664 38.0883 11.7664 37.997 11.7985C37.6937 11.905 37.3904 12.0116 37.0871 12.1182C36.5479 12.3077 36.0086 12.4965 35.4693 12.6855C35.1709 12.79 34.8726 12.8945 34.5742 12.9991C34.4548 13.0409 34.3354 13.0828 34.216 13.1246C34.1274 13.1557 34.1274 13.1557 34.037 13.1874C30.6343 14.3797 30.6343 14.3797 30.4552 14.4425C30.3358 14.4843 30.2164 14.5262 30.097 14.568C29.7988 14.6725 29.5006 14.777 29.2024 14.8815C28.601 15.0922 27.9997 15.3031 27.3985 15.5144C26.8621 15.703 26.3254 15.8909 25.7886 16.0782C25.4323 16.2026 25.0764 16.3279 24.7206 16.4538C24.4888 16.5357 24.2568 16.6168 24.0248 16.6977C23.9161 16.7358 23.8076 16.7741 23.6991 16.8128C23.5497 16.8661 23.3999 16.9182 23.25 16.9702C23.1658 16.9998 23.0815 17.0295 22.9947 17.0601C22.5934 17.1617 22.2288 17.1651 21.8353 17.0172C21.77 16.9933 21.7047 16.9694 21.6374 16.9448C21.5664 16.9178 21.4954 16.8909 21.4223 16.8631C21.2592 16.8033 21.096 16.7435 20.9328 16.6838C20.8888 16.6676 20.8447 16.6514 20.7993 16.6346C20.267 16.4388 19.7316 16.2524 19.1963 16.0656C18.9509 15.9799 18.7055 15.894 18.4602 15.808C18.1416 15.6965 17.8229 15.585 17.5042 15.4735C17.3764 15.4288 17.2487 15.3841 17.1209 15.3394C16.993 15.2946 16.865 15.2499 16.7371 15.2051C16.6419 15.1718 16.6419 15.1718 16.5448 15.1378C16.2231 15.0253 15.9015 14.9128 15.5798 14.8003C14.9486 14.5796 14.3175 14.3586 13.6866 14.1368C12.1428 13.5944 10.5968 13.0596 9.04786 12.5329C8.53287 13.2115 8.53287 13.2115 8.12185 13.9584C8.09918 14.0067 8.0765 14.055 8.05314 14.1048C7.46064 15.393 7.27735 16.6468 7.23079 18.0555C7.29574 18.0763 7.3607 18.0971 7.42762 18.1186C7.99962 18.3253 8.28184 18.8186 8.55865 19.3465C8.79403 19.9328 8.8019 20.7177 8.58922 21.3144C8.36223 21.8043 8.02526 22.2739 7.58023 22.574C7.5341 22.574 7.48797 22.574 7.44045 22.574C7.44637 22.6133 7.45229 22.6525 7.45838 22.6929C7.75239 24.6429 8.04396 26.5931 8.32471 28.5451C8.34344 28.6751 8.36218 28.8051 8.38093 28.9352C8.38986 28.9972 8.39878 29.0591 8.40798 29.123C8.47897 29.6132 8.55387 30.1026 8.63177 30.5916C8.79531 31.6328 8.79531 31.6328 8.62389 31.975C8.22494 32.5071 7.57834 32.7156 6.95124 32.8034C5.78455 32.9134 4.7483 32.8277 3.79757 32.0862C3.35699 31.4665 3.85631 29.794 3.95482 29.0873C3.97654 28.9296 3.99826 28.7719 4.01998 28.6142C4.21089 27.2369 4.42118 25.8629 4.63898 24.4898C4.70398 24.0795 4.76668 23.6689 4.82761 23.258C4.8506 23.1031 4.87437 22.9484 4.8983 22.7937C4.83798 22.4903 4.69089 22.4286 4.44731 22.2633C4.05197 21.9517 3.80915 21.4456 3.69274 20.9558C3.60709 20.1501 3.66172 19.4947 4.13582 18.8164C4.42448 18.4664 4.73037 18.1844 5.13417 17.9838C5.13555 17.9434 5.13694 17.9031 5.13836 17.8615C5.19666 16.2397 5.38681 14.7982 6.06891 13.3218C6.10008 13.2542 6.13124 13.1866 6.16335 13.1169C6.38628 12.6512 6.65051 12.2324 6.95124 11.8157C5.90666 11.4151 4.86089 11.0226 3.80194 10.6636C3.67402 10.6202 3.67402 10.6202 3.54351 10.5759C3.37039 10.5172 3.19727 10.4586 3.02413 10.3999C2.60689 10.2583 2.19002 10.1156 1.77391 9.97058C1.64345 9.92526 1.51276 9.88063 1.38207 9.83601C0.889274 9.66362 0.496547 9.51978 0.145956 9.11264C-0.00482246 8.79721 -0.0313436 8.57299 0.0323889 8.22956C0.211543 7.8179 0.476839 7.61876 0.877589 7.45238C1.04975 7.38961 1.22181 7.32912 1.39519 7.27027C1.48945 7.23674 1.58365 7.20305 1.6778 7.16922C1.92054 7.08257 2.16398 6.9983 2.4078 6.91493C2.62275 6.84136 2.83734 6.7667 3.05201 6.69229C3.3471 6.59058 3.64245 6.48976 3.93812 6.38983C4.63702 6.15359 5.33341 5.90999 6.0296 5.66548C6.15193 5.62254 6.27426 5.5796 6.39659 5.53666C6.64433 5.44968 6.89206 5.36266 7.13978 5.27563C7.68132 5.0854 8.22302 4.89567 8.76472 4.70591C9.06294 4.60143 9.36116 4.49692 9.65937 4.39241C9.77876 4.35057 9.89816 4.30874 10.0175 4.2669C10.0766 4.24619 10.1357 4.22548 10.1966 4.20414C10.7339 4.01587 10.7339 4.01587 10.913 3.95311C11.0324 3.91128 11.1517 3.86944 11.2711 3.82761C11.5698 3.72296 11.8684 3.6183 12.167 3.51366C12.7024 3.32607 13.2377 3.13848 13.773 2.95084C14.8051 2.58906 15.8372 2.22731 16.8695 1.86616C16.9333 1.84383 16.9972 1.82151 17.0629 1.7985C17.384 1.68617 17.7052 1.57386 18.0263 1.46158C18.6853 1.23116 19.3441 1.0003 20.0027 0.768753C20.201 0.699085 20.3993 0.629425 20.5976 0.559767C20.7242 0.515276 20.8507 0.470742 20.9773 0.426163C21.1518 0.364686 21.3263 0.30335 21.5009 0.242042C21.5524 0.223867 21.6038 0.205692 21.6569 0.186966C22.2789 -0.0311071 22.7234 -0.0814219 23.3554 0.160234Z"
        fill={fillColor}
      />
      <path
        d="M10.3058 14.326C10.9538 14.4723 11.5696 14.6849 12.1926 14.9147C12.4801 15.0207 12.768 15.1252 13.056 15.2298C13.1138 15.2508 13.1716 15.2718 13.2311 15.2935C13.7392 15.4777 14.2494 15.6543 14.7611 15.8276C15.5795 16.1053 16.3959 16.3886 17.2115 16.6749C17.2712 16.6958 17.3308 16.7167 17.3923 16.7383C18.0263 16.9607 18.6601 17.1835 19.294 17.4065C19.5571 17.499 19.8203 17.5915 20.0835 17.6839C20.2695 17.7493 20.4555 17.8148 20.6414 17.8803C20.7556 17.9204 20.8697 17.9605 20.9838 18.0006C21.0604 18.0277 21.0604 18.0277 21.1385 18.0553C22.4337 18.5092 23.2368 18.3345 24.4951 17.8539C25.0215 17.6536 25.5534 17.4698 26.0851 17.2849C26.3307 17.1993 26.5762 17.1133 26.8218 17.0273C27.1403 16.9157 27.459 16.8043 27.7776 16.6928C27.9054 16.6481 28.0332 16.6034 28.161 16.5587C28.6735 16.3794 29.1859 16.2001 29.6984 16.0208C30.3504 15.7928 31.0024 15.5645 31.6542 15.336C31.7194 15.3131 31.7846 15.2902 31.8517 15.2667C32.1618 15.158 32.4719 15.0492 32.782 14.9404C33.047 14.8473 33.3122 14.7546 33.5774 14.662C33.7115 14.6151 33.8456 14.5681 33.9796 14.5211C34.0555 14.4947 34.1313 14.4683 34.2095 14.4411C34.274 14.4186 34.3386 14.396 34.4051 14.3728C34.5567 14.326 34.5567 14.326 34.6965 14.326C34.8546 16.3567 35.0077 18.3881 35.1158 20.4224C35.1187 20.4754 35.1216 20.5284 35.1246 20.5831C35.1871 21.7439 35.206 22.5963 34.4418 23.5196C32.9036 25.2673 30.4038 25.9693 28.2342 26.4107C28.082 26.4419 27.9304 26.475 27.7787 26.5092C27.1679 26.6397 26.5545 26.7117 25.9344 26.7787C25.8526 26.7876 25.7708 26.7964 25.6866 26.8055C24.5042 26.9265 23.3263 26.9641 22.1386 26.9625C22.0708 26.9625 22.0031 26.9624 21.9332 26.9623C20.9403 26.9602 19.9566 26.9494 18.9718 26.8056C18.8926 26.7941 18.8133 26.7825 18.7316 26.7706C15.9903 26.3572 12.7591 25.7643 10.7251 23.6499C10.6565 23.5818 10.6565 23.5818 10.5864 23.5123C9.96612 22.8526 9.84562 22.1576 9.85924 21.2718C9.86637 21.0125 9.87617 20.7533 9.88647 20.4941C9.89046 20.385 9.89441 20.276 9.89835 20.1669C9.95118 18.7352 10.0318 17.3057 10.1354 15.877C10.1399 15.8147 10.1444 15.7525 10.149 15.6884C10.1617 15.5131 10.1748 15.3378 10.1881 15.1625C10.1919 15.1108 10.1957 15.0591 10.1996 15.0058C10.2179 14.7728 10.2401 14.5504 10.3058 14.326Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default MyCoursesIcon;