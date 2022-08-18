import Image from "next/image"

type userDataPropsType = {
  userData: {
    userName: string
    TwitterUrl: string
    GitHubUrl: string
    QiitaUrl: string
  }
}

function Float({ userData }: userDataPropsType) {
  return (
    <div
      style={{
        paddingTop: "1rem",
        paddingLeft: "1rem",
        textAlign: "right",
        backgroundColor: "#2F2D32",
      }}
    >
      <div
        style={{
          float: "left",
          position: "fixed",
          height: "300px",
          padding: "0.5rem",
          textAlign: "center",
          fontFamily: "Helvetica Neue",
        }}
      >
        <div className="imgDiv">
          <Image
            src="/images/twitter.png"
            alt="画像"
            width="30px"
            height="30px"
            onClick={() => window.open(userData.TwitterUrl)}
          />
        </div>
        <br />
        <div className="imgDiv">
          <Image
            src="/images/github.png"
            alt="画像"
            width="30px"
            height="30px"
            onClick={() => window.open(userData.GitHubUrl)}
          />
        </div>
        <br />
        <div className="imgDiv">
          <Image
            src="/images/qiita.png"
            alt="画像"
            width="30px"
            height="30px"
            onClick={() => window.open(userData.QiitaUrl)}
          />
        </div>
        <div style={{ height: "200px" }} />
        <div className="imgDiv">
          <Image
            src="/images/scrollTop.png"
            width="28px"
            height="28px"
            onClick={Float.scrollTop}
            onKeyPress={Float.scrollTop}
            alt="scroll top"
          />
        </div>
        <br />
      </div>
    </div>
  )
}

Float.defaultProps = {
  userData: {
    userName: "sena-v",
    TwitterUrl: "https://twitter.com/card1nal_tetra",
    GitHubUrl: "https://github.com/sena-v",
    QiitaUrl: "https://qiita.com/sena_v",
  },
}

Float.scrollTop = () => {
  window.scrollTo(0, 0)
}

export default Float

// アイコン：ttps://qiita.com/tkit/items/932316c5f5f7b162b61e#github
