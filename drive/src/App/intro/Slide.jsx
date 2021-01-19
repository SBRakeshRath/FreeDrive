import { React, useEffect, useState } from "react";
import "./slide.scss";
const Slide = () => {
  const slider_details = [
    {
      index: 0,
      IMG:
        "https://kstatic.googleusercontent.com/files/56d87c8f379a15041193391b51180fbb5935b90f781e9fd4c986c708a7bba4feb63e4a2bedd40f59781db773aed145886961efa322e1132a0ffbd5cf89841399",
      ImageAlt: "Sales Force",
      text:
        "I never worry about finding a document. Everything’s in Drive, I can access it anywhere, and that’s been revolutionary",
      link: "https://gsuite.google.com/customers/salesforce.html",
    },
    {
      index: 1,
      IMG:
        "https://kstatic.googleusercontent.com/files/80c8d2dd793b6a865b5f8cac21246517692bba8fe06fdde8ff60acac370e0c882c64f2e152ab697cd32a3fcf8057a0b374aa506263d70ac45c59e2a8d9906ed3",
      ImageAlt: "Cardinal Group",
      text:
        "Most of our team members were already familiar with Drive and found it very intuitive and easy to use, so change management was minimal and we were quickly up and running.",
      link:
        "https://cloud.google.com/blog/products/drive/cardinal-group-relies-on-drive-and-g-suite-to-maximize-collaboration",
    },
    {
      index: 3,
      IMG:
        "https://kstatic.googleusercontent.com/files/bbc0f51e62b28b6d86582618198a8b59035e516a8c57c310903133492fe99ce6895132d610ce3e08f515f8546c1775a686a361196720f20aa55a5de2fc46d78a",
      ImageAlt: "Ibotta",
      text:
        "Real-time collaboration with Google Docs and Drive is a must-have...if we ever tried to move employees off it, it would be a torches and pitchforks situation—complete chaos.",
      link:
        "http://services.google.com/fh/files/misc/google_drive_customer_story_ibotta.pdf",
    },
    {
      index: 4,
      IMG:
        "https://kstatic.googleusercontent.com/files/b5af3d693a691ac5db3db897b94c0d70678313cc3c97f2efa72e873555651b098bf66720d38387649d7f7b195ad53df50f951e3daff8d25823d561f8fb760409",
      ImageAlt: "ATB Financial",
      text:
        "Google is revolutionizing collaboration and individual productivity through AI. Employees can focus more on creating value for our customers and less on mundane tasks.",
      link: "https://gsuite.google.com/customers/atb-financial.html",
    },
  ];
  const [sliderId, newSliderId] = useState(0);

  const sliderIdChangerPrev = () => {
    console.log(sliderId + 1);
    if (sliderId === 0) {
      newSliderId(0);
    } else {
      newSliderId(sliderId - 1);
    }
  };
  const sliderIdChangerNext = () => {
    if (sliderId === slider_details.length - 1) {
      newSliderId(slider_details.length - 1);
    } else {
      newSliderId(sliderId + 1);
    }
  };

  useEffect(() => {
    document.getElementsByClassName("dot")[0].style.backgroundColor = "black";
  }, []);

  const Card = (props) => {
    return (
      <>
        <div className="card">
          <div className="img">
            <img src={props.IMG} alt={props.ImageAlt} />
          </div>
          <p>“{props.text}”</p>
          <a href={props.link}>Read story</a>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="slideContainer">
        <div className="prev" onClick={sliderIdChangerPrev}>
          <div className="btn_wrap">
            <div className="btn"></div>
          </div>
        </div>
        <div className="next" onClick={sliderIdChangerNext}>
          <div className="btn_wrap">
            <div className="btn"></div>
          </div>
        </div>
        <div className="dotContainer">
          <div className="dotWrapper">
            {slider_details.map((val, ind, arr) => {
              return (
                <div
                  className="dot"
                  onClick={(e) => {
                    newSliderId(ind);
                    // document.getElementsByClassName("dot")[0].style.backgroundColor ="transparent";
                    var dotClass = document.getElementsByClassName("dot");
                    for (
                      let index = 0;
                      index < document.getElementsByClassName("dot").length;
                      index++
                    ) {
                      dotClass[index].style.backgroundColor = "transparent";
                      console.log(dotClass[index]);
                    }
                    e.target.style.backgroundColor = "black";
                  }}
                ></div>
              );
            })}
          </div>
        </div>
        <div className="CardContainer">
          <Card
            IMG={slider_details[sliderId].IMG}
            ImageAlt={slider_details[sliderId].ImageAlt}
            text={slider_details[sliderId].text}
            link={slider_details[sliderId].link}
          />
        </div>
        {/* <div className="card">card 2</div>
                <div className="card">card 3</div> */}
      </div>
    </>
  );
};

export default Slide;
