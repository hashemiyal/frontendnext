const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-footer">
        <div className="inner-wrapper">
         
          <div className="footer-menu">
            <span></span>
            <span></span>
         
            <span>آدرس: کابل جان مارکت مندوی افغانستان</span>
          </div>
          <div className="footer-menu">
            <span>راه‌های ارتباطی</span>
            <ul className="contact">
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  اینستاگرام
                </a>
              </li>
        
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  تلگرام
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright-box">
        <div className="container-footer">
          <p>© {new Date().getFullYear()} Made With Love | Murtaza Hashemi Yal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;