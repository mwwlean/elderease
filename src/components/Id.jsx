import QRCode from "react-qr-code";
export default function Id({ formData }) {
  return (
    <>
      <div className="front">
        <div className="id-item">
          <img className="id-bg" src="/img/imgbg.jpg" alt="" />
          <img className="id-text" src="/img/imgtext.jpg" alt="" />

          <div className="head-id flex items-center justify-evenly">
            <img className="logo-id" src="/img/imglogo2.png" alt="" />
            <div className="text-ids">
              <h1> REPUBLIKA NG PILIPINAS </h1>
              <p> Republic of Philippines </p>
              <h5>
                Kapisahan Ng Mga Senior Citizens ng Brgy. Pinagbuhatan
                <br />
                Pasig City Incorporated
              </h5>
              <p>
                Association of Senior Citizens of Brgy. Pinagbuhatan
                <br />
                Pasig City Incorporated.
              </p>
            </div>
            <img className="logo-id" src="/img/imglogo.png" alt="" />
          </div>
          <div className="line"></div>

          <div className="id-main flex items-center justify-evenly">
            <div className="std-lf grid">
              <div className="std-lf-txt-hd flex items-center justify-evenly">
                <h3> CTR No: {formData.contrNum} </h3>
              </div>
              {formData.img ? (
                formData.img instanceof File ? (
                  <img src={URL.createObjectURL(formData.img)} alt="Profile" />
                ) : (
                  <img
                    src={`http://localhost/seniorpayment${formData.img}`}
                    alt="Profile"
                  />
                )
              ) : (
                <img src="/img/default-profile.png" alt="No Image" />
              )}

              <h1 className="text-xl"> OSCA ID: {formData.oscaID} </h1>
              {/* <img src={formData.img} alt="" /> */}
            </div>
            <div className="std-rt">
              <div className="label-form">
                <label htmlFor="lastName"> Apelyido / Lastname </label>
                <p className="lastName"> {formData.lastName} </p>
              </div>
              <div className="label-form">
                <label htmlFor="firstName"> Pangalan / First Name </label>
                <p className="firstName"> {formData.firstName} </p>
              </div>
              <div className="label-form">
                <label htmlFor="middleName">
                  {" "}
                  Gitnang Apelyido / Middle Name{" "}
                </label>
                <p className="middleName"> {formData.middleName} </p>
              </div>
              {formData.suffix && (
                <div className="label-form">
                  <label htmlFor="suffix"> Panlaping Pandulo / Suffix </label>
                  <p className="suffix"> {formData.suffix} </p>
                </div>
              )}
              <div className="label-form">
                <label htmlFor="gender"> Kasarian / Sex </label>
                <p className="gender"> {formData.gender} </p>
              </div>
              <div className="label-form">
                <label htmlFor="address"> Tirahan / Address </label>
                <p className="address"> {formData.address} </p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="main-name"> Front </h1>
      </div>

      <div className="back">
        <div className="id-item">
          <img className="id-bg" src="/img/imgtext.jpg" alt="" />
          <img className="id-lg-1" src="/img/imglogo.png" alt="" />
          <img className="id-lg-2" src="/img/imglogo2.png" alt="" />
          <div className="id-main flex items-center justify-evenly flex-wrap ">
            <div className="qr-text grid grid-cols-2 gap-3">
              <div className="qr">
                <QRCode
                  className="qr-image"
                  value={JSON.stringify(formData)}
                  size={128}
                />
                {/* <img className='qr-image' src={URL.createObjectURL(formData.img)} alt="Profile" /> */}
              </div>
              <div className="txtwqr">
                <div className="label-form">
                  <label htmlFor="birthday">
                    {" "}
                    Petsa ng Kapanganakan / Birthday{" "}
                  </label>
                  <p className="birthday"> {formData.birthday} </p>
                </div>
                <div className="label-form">
                  <label htmlFor="age"> Edad / Age </label>
                  <p className="age"> {formData.age} yrs. old </p>
                </div>
                <div className="label-form">
                  <label htmlFor="contactNum">
                    {" "}
                    Numbero ng Telepono / Contact No.{" "}
                  </label>
                  <p className="contactNum"> {formData.contactNum} </p>
                </div>
                <div className="label-form">
                  <label htmlFor="contactNum"> Rules and Regulations: </label>
                  <li>This ID is not for sale.</li>
                  <li>
                    In case the Payment Booklet is lost, you can present this ID
                    to have a new one.
                  </li>
                  <li>Pay your membership annually for Php 150</li>
                </div>
              </div>
            </div>
            <div className="signature w-full grid grid-cols-2 gap-3">
              <div className="sig1">
                <div className="line"></div>
                <h1>
                  Ricardo T. Huazon
                  <br />
                  <span className="font-bold">President</span>
                </h1>
              </div>
              <div className="sig2">
                <div className="line"></div>
                <h1>
                  Signature Over Printed Name <br />
                  of Card Holder
                </h1>
              </div>
            </div>
          </div>
        </div>
        <h1 className="main-name"> Back </h1>
      </div>
    </>
  );
}
