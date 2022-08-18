import Link from "next/link"
import { Dispatch } from "react"

type HeaderPropsType = {
  siteTitle: string
  setTagPage: Dispatch<string>
}

const Header = ({ siteTitle, setTagPage }: HeaderPropsType) => {
  return (
    <header>
      <div
        style={{
          display: "inline-block",
          height: "320px",
          width: "100%",
          backgroundImage: "url(images/titleback.jpg)",
          backgroundSize: "cover",
          backgroundColor: "#02031b",
        }}
        data-testid="bgImage"
      >
        <p
          style={{
            margin: 0,
            fontSize: "60px",
            textAlign: "center",
            padding: "2rem",
            paddingTop: "8rem",
          }}
        >
          <Link href="/" aria-label={siteTitle}>
            <a
              style={{
                color: "#2196F3",
                textDecoration: "none",
                fontSize: "70px",
                fontWeight: "bold",
              }}
              onClick={() => setTagPage("")}
            >
              {siteTitle}
            </a>
          </Link>
        </p>
        <div style={{ paddingTop: "6rem" }} />
        <div
          style={{
            background: "#fff800",
            height: "3px",
          }}
        />
      </div>
    </header>
  )
}

export default Header
