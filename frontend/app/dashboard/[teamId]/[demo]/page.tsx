"use client";
import React, { useState, useEffect, useRef } from 'react';
import UploadTest from "@/components/upload-test";
import { DeepChat } from "deep-chat-react";
import LogViewer from "@/components/log-viewer";
export default function Page({ params }: { params: { demo: string } }) {
  const { demo } = params;
  const deepChatRef = useRef<DeepChat>(null); // Ref for DeepChat component
  const [userInput, setUserInput] = useState<string>('');

  const history = [
    { role: 'user', text: 'Hey, how are you today?' },
    { role: 'ai', text: 'I am doing very well!' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(navigator.userAgent);
    }
  }, []);
  useEffect(() => {
    console.log('Welcome to the log viewer!');
    console.log('This is another log message.');
}, []);

  const handleConnect = (body: any, signals: any) => {
    try {
      console.log("Connect Handler Body:", body.messages[0].text); // Log the entire body

      // Extract input based on the actual structure
      const query = body.messages[0].text || ""; // Adjust this line
      console.log("Extracted Query:", query);

      fetch(`/api/chat?q=${encodeURIComponent(query)}`)
        .then(response => response.text())
        .then(text => {
          signals.onResponse({ text }); // Display response
        })
        .catch(() => {
          signals.onResponse({ error: 'Error' }); // Display error
        });
    } catch (error) {
      console.error("Error handling chat:", error);
      signals.onResponse({ error: 'Error' }); // Display error
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <div className="flex flex-col items-center justify-start w-full flex-1 px-8 text-center">

        <div className="mt-8 w-full grid grid-cols-3 gap-4">
         
          <div className="col-span-2">
            <DeepChat
              className="demo-chat-container border-none"
              style={{
                width: '100%',
                backgroundColor: 'hsl(var(--secondary) / 0.1)', 
                minWidth: '50vw',
                height: '600px',
                
              }}
              messageStyles={{
                "default": {
                  "shared": {
                    "bubble": {
                      "maxWidth": "100%", "backgroundColor": "unset", "marginTop": "14px", "marginBottom": "14px"}},
                  "user": {
                    "bubble": {
                      "marginLeft": "0px", "color": "rgb(212 212 216 / 1)"}},
                  "ai": {
                    "bubble": {
                      "marginLeft": "0px", "color": "rgb(212 212 216 / 1)"
                    },
                    "outerContainer": {
                      "backgroundColor": "#111111", "color": "white", "borderTop": "1px solid rgba(0,0,0,.5)", "borderBottom": "1px solid rgba(0,0,0,.5)" 
                    }
                  },
                  "loading": {
                    "bubble": {"backgroundColor": "#545454", "color": "white"}
                  }
                }
              }}  
              avatars={{
                "default": {"styles": {"position": "left"}},
                "ai": {"src": "/prof.jpg"}
              }}
              auxiliaryStyle="
              ::-webkit-scrollbar {
                width: 10px;
                height: 10px;
              }
              ::-webkit-scrollbar-thumb {
                background-color: grey;
                border-radius: 5px;
              }
              ::-webkit-scrollbar-track {
                background-color: unset;
              }"
              textInput={{  // Correctly placed prop
                "styles": {
                  "container": {
                    "width": "100%",
                    "margin": "0",
                    "border": "unset",
                    "borderTop": "1px solid #d5d5d5",
                    "borderRadius": "0px",
                    "boxShadow": "unset"
                  },
                  "text": {
                    "fontSize": "1.05em",
                    "paddingTop": "11px",
                    "paddingBottom": "13px",
                    "paddingLeft": "12px",
                    "paddingRight": "2.4em",
                    "color": "rgb(55 55 55 / 1)"
                  }
                },
                placeholder: { text: 'Ask me anything!' }
              }}
              ref={deepChatRef} // Ref for DeepChat component
              history={history}
              connect={{
                handler: handleConnect,
              }}
            >
              <div
                style={{
                  width: 200,
                  backgroundColor: 'hsl(var(--secondary) / 0.1)', 
                  borderRadius: '10px',
                  padding: '12px',
                  paddingBottom: '15px',
                  display: 'none',
                }}
              >
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '8px', fontSize: '16px' }}>
                    <b>Intro panel</b>
                  </div>
                  <div style={{ fontSize: '15px', lineHeight: '20px' }}>
                    Insert a description to help your users understand how to use the component.
                  </div>
                </div>
              </div>
            </DeepChat>
          </div>
         
          <div className="col-span-1 bg-neutral-400 p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Information Panel</h2>
            <p className="text-gray-600">
              Logs
            </p>
            <LogViewer />
          </div>

        </div>

      </div>
    </div>
  );
}

