import { cn } from "@/lib/utils";
import {
  motion,
  MotionValue,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { TweetCard } from "@/components/TweetCard";
import ShimmerButton from "@/components/magicui/shimmer-button";
import Marquee from "@/components/magicui/marquee";
import { uploadImage } from "@/pages/api/facecheck";
import {
  createPersonDocument,
  getPersonFromFirestore,
  updatePersonDoc,
} from "@/utils/firebase";
import PersonCard from "../PersonCard";

const transition = {
  duration: 0,
  ease: "linear",
};

const tweets = [
  // <TweetCard key="1764472814353183199" id="1764472814353183199" className="shadow-2xl text-neutral-400" />,
  <TweetCard
    key="1764473600680350134"
    id="1764473600680350134"
    className="shadow-2xl text-neutral-400"
  />,
  <TweetCard
    key="1764473978251546841"
    id="1764473978251546841"
    className="shadow-2xl text-neutral-400"
  />,
  <TweetCard
    key="1765552645123588334"
    id="1765552645123588334"
    className="shadow-2xl text-neutral-400"
  />,
  <TweetCard
    key="1765439154156880269"
    id="1765439154156880269"
    className="shadow-2xl text-neutral-400"
  />,
  <TweetCard
    key="1764530838476353953"
    id="1764530838476353953"
    className="shadow-2xl text-neutral-400"
  />,
  <TweetCard
    key="1764502094260678741"
    id="1764502094260678741"
    className="shadow-2xl text-neutral-400"
  />,
  <TweetCard
    key="1765436615487586743"
    id="1765436615487586743"
    className="shadow-2xl text-neutral-400"
  />,
  <TweetCard
    key="1764485042632380445"
    id="1764485042632380445"
    className="shadow-2xl text-neutral-400"
  />,
];

export const Landing = ({
  pathLengths,
  title,
  description,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(null)
  const [peopleScanResult, setPeopleScanResult] =
    useState({});

  // Starts video stream
  const startVideo = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia(
          { video: true }
        );
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(
        "Error accessing the camera",
        err
      );
    }
  };

  // Stops video stream
  const stopVideo = () => {
    if (
      videoRef.current &&
      videoRef.current.srcObject
    ) {
      const stream = videoRef.current
        .srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(
      window.location.search
    );
    const docId = urlParams.get("docId");
    if (docId) {
      getPersonFromFirestore(docId).then(
        (finalData) => {
          setPeopleScanResult(finalData);
        }
      );
    }
  }, [currentDocId]);

  // Sends image data to API
  const sendImageToAPI = async (imageDataUrl) => {

    let uuid = localStorage.getItem("userID");
    if (!uuid) {
      uuid = Math.random()
        .toString(36)
        .substring(7);
      localStorage.setItem("userID", uuid);
    } else {
      let numberOfScans = parseInt(
        localStorage.getItem("numberOfScans") ||
          "0"
      );
      if (numberOfScans === 0) {
        localStorage.setItem(
          "numberOfScans",
          "1"
        );
      } else {
        if (numberOfScans >= 2) {
          alert("You're out of scans, sorry!");
          return;
        } else {
          localStorage.setItem(
            "numberOfScans",
            (numberOfScans + 1).toString()
          );
        }
      }
    }
    const imageURL = await uploadImage(
      imageDataUrl
    );
    const personDocID =
      await createPersonDocument(uuid, imageURL);

    try {
      const response = await fetch(
        "/api/facecheck",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageData: imageDataUrl,
            personDocID: personDocID,
          }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        getPersonFromFirestore(personDocID).then(
          (finalData) => {
            setLoading(false);
            setPeopleScanResult(finalData);
            setCurrentDocId(personDocID);
          }
        );

      } else {
        console.log("error??");
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToLink = (url) => {
    window.open(url, "_blank");
  }
  // Captures photo from video stream
  const takePhoto = () => {
    setLoading(true);
    if (canvasRef.current && videoRef.current) {
      const context = (
        canvasRef.current as HTMLCanvasElement
      ).getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          (canvasRef.current as HTMLCanvasElement)
            .width,
          (canvasRef.current as HTMLCanvasElement)
            .height
        );
        const imageDataUrl = (
          canvasRef.current as HTMLCanvasElement
        ).toDataURL("image/png");
        sendImageToAPI(imageDataUrl);
        // stopVideo();
        setImage(imageDataUrl);
      }
    }
  };

  useEffect(() => {
    startVideo();
  }, []);

  const handleShareOnTwitter = () => {
    console.log("clicked");
    const url = `https://twitter.com/intent/tweet?text=I just used Whomane to scan a person and find their socials. Try it here:&url=${window.location.href}`;
    console.log(url);
    window.open(url, "_blank");
  }
  return (
    <>
      <div className="container py-6.5 grid gap-6 px-4 md:grid-cols-2 md:gap-8 lg:px-6 lg:py-8.5">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-lg md:text-7xl font-normal pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300">
              Whomane
            </h1>
            <p className="text-xs md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto">
              An open source wearable with camera.
            </p>
          </div>
          <form className="mt-64 flex justify-center flex-row gap-4">
            <ShimmerButton className="shadow-2xl" onClick={()=>{navigateToLink("https://github.com/Whomane/Whomane")}}>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.86 2.33.66.07-.52.28-.86.51-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span className="pl-3 whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Clone GitHub project
              </span>
            </ShimmerButton>
            <ShimmerButton className="shadow-2xl" shimmerColor="black" onClick={()=>{navigateToLink("https://discord.gg/CDZKVKDMQV")}}>
    
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Join Discord
              </span>
            </ShimmerButton>
          </form>
        </div>
        <div className="flex items-center justify-center flex-col">
          <p className="text-neutral-400 font-bold my-4">
            Try it for yourself ⤵
          </p>

          <div className="border border-gray-200 w-full max-w-sm rounded-lg dark:border-gray-800">
            <div className="aspect-[1/1] overflow-hidden rounded-lg">
              <>
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                  }}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    style={{
                      display: image
                        ? "none"
                        : "flex",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform:
                        "rotateY(180deg)",
                    }}
                  ></video>
                  <canvas
                    ref={canvasRef}
                    style={{ display: "none" }}
                    width="640"
                    height="480"
                  ></canvas>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2%",
                      left: "50%",
                      transform:
                        "translate(-50%, -50%)",
                    }}
                  >
                    <ShimmerButton
                      shimmerColor={"#000000"}
                      onClick={takePhoto}
                      disabled={loading}
                    >
                      {loading
                        ? "Processing..."
                        : "Take photo"}
                    </ShimmerButton>
                  </div>
                </div>
                {image && (
                  <Image
                    src={image}
                    alt="Captured"
                    width={640}
                    height={480}
                    style={{
                      transform:
                        "rotateY(180deg)",
                    }}
                    loader={({ src }) => src}
                    unoptimized // since you're handling optimization
                  />
                )}
              </>
            </div>
          </div>
        </div>
      </div>

      <main className="flex flex-col bg-black">
        {peopleScanResult &&
          Object.keys(peopleScanResult).length !==
            0 && (
            <PersonCard
              key={peopleScanResult?.["id"] || ""}
              id={peopleScanResult?.["id"] || ""}
              time={
                peopleScanResult?.["time"] || ""
              }
              socials={
                peopleScanResult?.["socials"] ||
                ""
              }
              linkedinSummary={
                peopleScanResult?.[
                  "linkedinSummary"
                ] || ""
              }
              linkedinSummaryAudio={
                peopleScanResult?.[
                  "linkedinSummaryAudio"
                ] || ""
              }
              latestQuestion={
                peopleScanResult?.[
                  "latestQuestion"
                ] || ""
              }
              imageURL={
                peopleScanResult?.[
                  "imageURL"
                ] || ""
              }
              updatePersonDoc={updatePersonDoc}
              {...peopleScanResult}
            />
          )}
             
      </main>
      {peopleScanResult &&
          Object.keys(peopleScanResult).length !==
            0 && (
      <div className="flex justify-center pb-8">
        <ShimmerButton className="shadow-2xl"  onClick={handleShareOnTwitter}>
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            Share on Twitter
          </span>
        </ShimmerButton>
      </div>)}
    </>
  );
};
