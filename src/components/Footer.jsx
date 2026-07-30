import Icon from './Icon'

const columns = [
  ['Quick Links', [['About', '#about'], ['Solutions', '#solutions'], ['Industries', '#industries'], ['FAQs', '#faq']]],
  ['Products', [['Laptops', '#solutions'], ['Desktops', '#solutions'], ['Mobiles', '#solutions'], ['Tablets', '#solutions']]],
]

const socialLinks = [
  ['Facebook', 'facebook', 'https://www.facebook.com/Xtracoverdotcom/'],
  ['X', 'xSocial', 'https://twitter.com/Xtracover_'],
  ['Instagram', 'instagram', 'https://www.instagram.com/xtracoverdotcom/'],
  ['LinkedIn', 'linkedin', 'https://www.linkedin.com/company/xtracover-com/'],
  ['YouTube', 'youtube', 'https://www.youtube.com/@xtracover8462'],
]

export default function Footer() {
  return (
    <footer className="bg-brand-950 py-14 text-white">
      <div className="container-site grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_.7fr_.7fr_1.2fr]">
        <div>
          <a href="#top" className="flex items-center gap-2.5" aria-label="XtraCover home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-lg font-black">X</span>
            <span className="text-lg font-black">XtraCover</span>
          </a>
          <p className="mt-5 max-w-sm text-sm leading-6 text-blue-100/55">Certified refurbished laptops and business devices for organizations across India.</p>

          <div className="mt-6 flex flex-wrap gap-2.5" aria-label="XtraCover social media">
            {socialLinks.map(([label, icon, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit XtraCover on ${label}`}
                className="footer-social-link"
              >
                <Icon name={icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map(([title, links]) => (
          <div key={title}>
            <h3 className="text-xs font-extrabold">{title}</h3>
            <div className="mt-4 grid gap-2.5">
              {links.map(([label, href]) => (
                <a key={label} href={href} className="text-xs text-blue-100/50 transition hover:text-white">{label}</a>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h3 className="text-xs font-extrabold">Contact</h3>
          <div className="mt-4 grid gap-3 text-xs leading-5 text-blue-100/55">
            <a href="https://maps.google.com/?q=A-1+3rd+Floor+FIEE+Complex+Okhla+Industrial+Area+Phase-2+New+Delhi+110020" target="_blank" rel="noreferrer" className="footer-contact-link items-start">
              <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>A-1, 3rd Floor, FIEE Complex, Okhla Industrial Area Phase-2, New Delhi 110020</span>
            </a>
            <a href="mailto:contactus@xtracover.com" className="footer-contact-link">
              <Icon name="mail" className="h-4 w-4 shrink-0" />
              <span>contactus@xtracover.com</span>
            </a>
            <a href="tel:+918860396039" className="footer-contact-link">
              <Icon name="phoneCall" className="h-4 w-4 shrink-0" />
              <span>+91 88603 96039</span>
            </a>
            <a href="#quote" className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-500">
              Talk to an Expert <Icon name="arrow" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="container-site mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[10px] text-blue-100/30 sm:flex-row">
        <span>© 2026 XtraCover. All rights reserved.</span>
        <div className="flex gap-5"><a href="https://www.xtracover.com/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a><a href="https://www.xtracover.com/Terms-and-Conditions" target="_blank" rel="noreferrer">Terms</a></div>
      </div>
    </footer>
  )
}


