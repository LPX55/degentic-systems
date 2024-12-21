'use client';

import dynamic from 'next/dynamic';

// need to import the component dynamically as it uses the 'window' property
const DeepChatComponent = dynamic(
  () => import('deep-chat-react').then((mod) => mod.DeepChat),
  {
    ssr: false,
  }
);

interface DeepChatProps {
    history?: Array<{ role: string; text: string }>;
    className?: string;
  }

  export default function DemoChat({ history = [], className = '' }: DeepChatProps) {
    return (
      
        <>
        <DeepChatComponent
            connect={{
                handler: (body, signals) => {
                    try {
                        // Encode the input text to safely include it in the URL
                        const query = encodeURIComponent(textInput.text);
                        fetch(`/api/chat?q=${query}`).then((response) => {  
                            response.text().then(text => {
                                signals.onResponse({ text }); // displays the response text message
                            });
                        }).catch(e => {
                            signals.onResponse({ error: 'Error' }); // displays an error message
                        });
                    } catch (e) {
                        signals.onResponse({ error: 'Error' }); // displays an error message
                    }
                },
            }}
            style={{ borderRadius: '10px', width: '100%', minWidth: '40vw' }}
            textInput={{ placeholder: { text: 'Ask me anything!' } }}
            history={history} >
            <div
                style={{
                    width: 200,
                    backgroundColor: '#f3f3f3',
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
            </DeepChatComponent>
        </>
    );
}

