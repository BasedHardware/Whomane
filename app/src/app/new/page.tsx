"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react";



export default function NewPhoto() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
  
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error accessing the camera', err);
      }
    };

    const stopVideo = () => {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
      
        tracks.forEach((track) => {
          track.stop();
        });
      
        videoRef.current.srcObject = null;
      }


    const sendImageToAPI = async (imageDataUrl) => {
        setLoading(true);
        try {
          const response = await fetch('/api/facecheck', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageData: imageDataUrl }),
          });
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            window.location.href = '/network';
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };
  
    const takePhoto = () => {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageDataUrl = canvasRef.current.toDataURL('image/png');

      sendImageToAPI(imageDataUrl);
      stopVideo();

      setImage(imageDataUrl);
    };

    useEffect(() => {
        startVideo();
    }, []);
    
  return (
    <div className="flex flex-col min-h-screen mt-16">
      <main className="flex-1">
        <div className="container py-6.5 grid gap-6 px-4 md:grid-cols-2 md:gap-8 lg:px-6 lg:py-8.5">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Whomane Demo</h1>
              <p className="text-gray-500 dark:text-gray-400">Take a photo of yourself to see what we know about you.</p>
            </div>
            <form>
              <Button  onClick={takePhoto}>Take photo</Button>
            </form>
          </div>
          <div className="flex items-center justify-center">
            <div className="border border-gray-200 w-full max-w-sm rounded-lg dark:border-gray-800">
              <div className="aspect-[1/1] overflow-hidden rounded-lg">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
<video ref={videoRef} autoPlay style={{ display: image?'none':'flex', width: '100%', height: '100%', objectFit: 'cover' }}></video>                    <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
                    {image && <img src={image} alt="Captured" />}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-64 flex justify-center">
        <Button className="bg-blue-500 text-white" onClick={()=>{window.location.href="/network"}}>View other scans</Button>
      </div>
      </main>
      <footer className="border-t">
        <div className="container flex justify-between items-center h-14 px-4 md:px-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">© 2024 Whomane</div>
          <nav className="flex gap-4 text-sm">
            <Link className="text-gray-500 dark:text-gray-400" href="#">
              Terms
            </Link>
            <Link className="text-gray-500 dark:text-gray-400" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
