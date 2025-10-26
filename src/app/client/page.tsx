'use client'; // This directive is necessary for using hooks in Next.js App Router

import axios from 'axios';
import React, { useEffect, useRef,useState } from 'react';

import { Insight } from '@/app/page';

// --- TypeScript Interfaces ---
interface ContentItem {
    id: string | number;
    title: string;
    content: string;
    tags: string;
}

interface UserProfile {
    name: string;
    email: string;
    picture: string;
}

interface StatusMessage {
    message: string;
    isError: boolean;
}

// --- Helper Components ---
const Loader: React.FC = () => (
    <div className="w-12 h-12 rounded-full border-8 border-gray-200 border-t-blue-500 animate-spin mx-auto"></div>
);

const ContentCard: React.FC<{ item: ContentItem }> = ({ item }) => {
    const tags = item.tags && String(item.tags).trim() !== ''
        ? String(item.tags).split(',').map(tag => (
            <span key={tag.trim()} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                {tag.trim()}
            </span>
        ))
        : <span className="text-xs text-gray-500">No tags</span>;

    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="font-bold text-lg text-gray-900">{item.title} (ID: {item.id})</div>
            <p className="text-gray-700 text-sm my-2">{item.content}</p>
            <div className="mt-3">{tags}</div>
        </div>
    );
};

function HitComponent() {
  
  const [insights, setInsights] = React.useState<Insight[]>([]);

  const hitFn = React.useCallback(() => {
    const headers = {
          "Content-Type": "text/plain;charset=utf-8",
          "Access-Control-Allow-Origin": '*',
          'Accept': '*/*', 
          "Cookie": 'SEARCH_SAMESITE=CgQI6Z4B; OSID=g.a0001ggXntkg6K7-CKBAAYmtqztEYz71qrZhHGOL3vXwfCYKoLUUNHYdlnCFunGtYtGuxSbNaQACgYKATISARESFQHGX2Mio2dyRd-LVjgGScfeWoXPtRoVAUF8yKq907Q5htvD3Ku8o9UBz9mA0076; __Secure-OSID=g.a0001ggXntkg6K7-CKBAAYmtqztEYz71qrZhHGOL3vXwfCYKoLUUQskHxp6wwM6JytgQQSswyAACgYKAbkSARESFQHGX2MiREmGqujVS8PEw4r4PjRAyxoVAUF8yKr-UxbiDO6y-O7ajnxRbSSc0076; OTZ=8269066_28_28__28_; S=billing-ui-v3=T29VxUE3Yx0iSJMCrlB9wBI3OmDF0EeU:billing-ui-v3-efe=T29VxUE3Yx0iSJMCrlB9wBI3OmDF0EeU:maestro=QZhe19o42Qb2sUfAq9ceszYJLN5Ga4vGw4tIMMAFuSU; _ga=GA1.3.171843673.1758447941; SID=g.a0002QgXnns7AokLe3yhOX6m5Qn2kJQgDv8kjHAqeHRUSFq5NJKq3FwSzsAV9TU1OM61FCdIrwACgYKAUoSARESFQHGX2MiiC6TI6XiugJajiFQC8MwGhoVAUF8yKpL9pxMwmcQNuTsLGZaIFrn0076; __Secure-1PSID=g.a0002QgXnns7AokLe3yhOX6m5Qn2kJQgDv8kjHAqeHRUSFq5NJKqQ8D0Ua8WxrKKV_vNW5o04QACgYKAYkSARESFQHGX2MilJcWNobbHdV-1HEsUnLbdxoVAUF8yKrxo4_2hHqpKybQG1aEtajw0076; __Secure-3PSID=g.a0002QgXnns7AokLe3yhOX6m5Qn2kJQgDv8kjHAqeHRUSFq5NJKq5msX42ltqQrUroHj06zTlgACgYKAVESARESFQHGX2MiVpgVcKmm_C9YgzjlWul_SxoVAUF8yKoN9tBeD3bkE7tdYxPuw8oL0076; HSID=AiB6YbB4llkKuVKJu; SSID=ATr-joodoGsdiX3m2; APISID=hAqrMJyvD4VKAXX2/AJcmEvYqvvgu_SfIV; SAPISID=OWOG1Dua2dPAWRhH/Ar9cI_sk1Q7JnR-it; __Secure-1PAPISID=OWOG1Dua2dPAWRhH/Ar9cI_sk1Q7JnR-it; __Secure-3PAPISID=OWOG1Dua2dPAWRhH/Ar9cI_sk1Q7JnR-it; __gsas=ID=8abb359002b37573:T=1760209629:RT=1760209629:S=ALNI_Mb3I_FHShcJhiW0kOk0wrAZsQYvuA; AEC=AaJma5sLGYMfz1G6z-vjCHsKghYYIEOX6iuwXq43CysuaXjd-hImenGqAaM; __Secure-1PSIDTS=sidts-CjEBmkD5S7y2cnR-sJ61KSj-Dca3cIAkqyAQ2OSXHcUBARAsCLqRleGrQQI3cwuMl31XEAA; __Secure-3PSIDTS=sidts-CjEBmkD5S7y2cnR-sJ61KSj-Dca3cIAkqyAQ2OSXHcUBARAsCLqRleGrQQI3cwuMl31XEAA; NID=525=U_BqjbG3_cmZ7ipbILkvWs0REgyuZnncpzx75TUK9MpCz0myBAwksnojMIXHYpmziQh4LECRKA5i3yh9gUHOmzZYpsHS4W9ggTwHcoZG3z9ycIO-ky-didf4fPG1g3tW2QI56pa-0-sVrWcZ4c6qDg-zL_Y3Q24cAEJOXZbvBCwjkOJ2eIKp_9V3WKwwFtgqBSii81AYKusb6xBpUYizPEOFco9x4KQfK_0axpnHfEOED6bPN7hLvaDbEcSckWU8MzQrIEFJvg84Fhv9xlOnR0h8_7J1vdNqZA-_vV3syJZXOd-47LngScw7obK2jOM7dU3NOv7sHhwPcO2cW7vZC6M8y-Vg8tPWfOdMG7MKUJRJGTyCBcoCLRarDa6jCPmmU4p9fdK_7CXBbPKHFLtlBg-_5FEeDerujFjrjWQuDomb4nmrtnVoigij5cz46EQaIvKWoBQ_6pM3oBWprN30ZSlVYwYkjJRe2ZWAS3bJ-j5Zw4f6EUZ50huhz3qtV0ZyRrFeMX4IaT5I9JYI1QNN-6zAVFt6yQCtVrIGg3oQy4hxhs50vLLDu8NsWDH3gc73WWcOZVtfjiLkjlNU_b_a0BnWypr98J3nuvk3L-9xumsry50ceyDa5sDwaTqqjKRslu67f4HzXv5o0SaCmwqJscknO5cQzWmNrm_JXNDjT05T1Uoig3KyRrzX1HskHuWLHWv7zXRFuYCKfmn7_pu2UTLfW6M5dheyVI0tGoMZGyzjph1a79iAgTDGYL5drIUgHGVGb2PvS3nX10PkUeR4mJ61EGgPwzkLGF9UbUufREz6ALzK7tf1OIdm_G9GmVuidXeL4lsubdpw4n5KcVbOu9R3izkdu1L5awg0ZGOw_zznJSRaXLWBDpyZRZaKYt8kj352YcN-GkidRn7BmM9nP24mCKyxMFq3tLEBz5zL3-YyujUVGwbOU-IhquW07G7a0x-jRh6o6681AKKCV47gEF1xIjF0heExDa_IXxnF39l2PwmIdFt7MHT_afCdr15Xwn5nYr0XTNQnoXH9AbUH3X23ndrdPAgl0D_2wUuom6QSbXEAXVJ9a3R-qkoiVrfQKMbIjzIXEO1MgSLtT2hoD1tzwsOIU2ROnvne6OAvlWZChbcjdF-jrE8pZQ; _ga_60Q1X42Z2X=GS2.1.s1760375879$o8$g0$t1760375879$j60$l0$h0; _ga_S6TL92G5N1=GS2.1.s1760375879$o8$g0$t1760375879$j60$l0$h0; SIDCC=AKEyXzW8wirD8YZai0g9d0g1Ouz_qIauQyUhLi2PSmEvIcDokLAJEs--N7qR6K36i9yFyWLVbUA; __Secure-1PSIDCC=AKEyXzXpJ7SXSN32ztot_MUqvlgbfwX5Ja98y5XYdtExaSMPiqSdKJbWf_5jUOHEa3Fl78CnVg; __Secure-3PSIDCC=AKEyXzVu3OrZBj06vcJXY2dRM8I_-3ZfGo2Gnk7QSdoYRHfdKz7HIEfYjlvJx-CrA928g7lKfNNi'
      }

      try {
        axios.get("http://localhost:3000/api/hello", { headers }).then(res => {
          console.log('res', res)
          res.data
        }).then(data => {
          setInsights(data.data);
        });
      } catch (err) {
        console.error("Error:", err);
      }
    
    // fetch("http://localhost:3000/backend", {
    //   method: "GET",
    //   // referrerPolicy:"unsafe-url",
    //   headers})
    //   .then(res => res.json())
    //   .then(data => {
    //       setInsights(data.data);
    //   })
    //   .catch(err => console.error("Error:", err));
  }, []);

  return (<>
    <button onClick={hitFn} className="mt-4 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300 text-sm">Hit</button>
  </>)
}


// --- Main Page Component ---
export default function Page() {
    // --- State Management ---
    const [user, setUser] = useState<UserProfile | null>(null);
    const [contentList, setContentList] = useState<ContentItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<StatusMessage | null>(null);
    const [formData, setFormData] = useState({ id: '', title: '', content: '', tags: '' });
    const [deleteId, setDeleteId] = useState('');
    
    const signInContainerRef = useRef<HTMLDivElement>(null);
    
    // The URL for your deployed Google App Script
    // For Next.js, it's best to use a proxy route (e.g., '/api/sheet') to avoid CORS issues.
    const webAppUrl = '/api/sheet'; // Using a local proxy is recommended

    // --- Effects ---
    useEffect(() => {
        // The Google Identity Services script should be loaded in your root layout or _document.js file
        if (window.google) {
            window.google.accounts.id.initialize({
                // IMPORTANT: Replace with your actual Google Client ID from environment variables
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "956842956043-sjtr123beoq92bitbkoidd0p42ai1jna.apps.googleusercontent.com",
                callback: handleCredentialResponse
            });

            if (signInContainerRef.current && !user) {
                window.google.accounts.id.renderButton(
                    signInContainerRef.current,
                    { theme: "outline", size: "large", text: "signin_with", shape: "rectangular" }
                );
            }
        } else {
            console.error("Google Identity Services script not loaded.");
        }
    }, [user]);
    
    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => setStatus(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);


    // --- Handlers & API Calls ---
    const handleCredentialResponse = (response: any) => {
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        setUser({ name: payload.name, email: payload.email, picture: payload.picture });
    };
    
    const handleSignOut = () => {
        setUser(null);
        if (window.google) {
            window.google.accounts.id.disableAutoSelect();
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const fetchAllContent = async () => {
        setIsLoading(true);
        setContentList([]);
        try {
            const res = await fetch(webAppUrl);
            if (!res.ok) throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
            const result = await res.json();
            if (result.status === 'error') throw new Error(result.message);
            setContentList(result.data);
        } catch (error: any) {
            setStatus({ message: `Error fetching content: ${error.message}`, isError: true });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(webAppUrl, {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!res.ok) throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
            const result = await res.json();
            if (result.status === 'error') throw new Error(result.message);
            setStatus({ message: result.message, isError: false });
            setFormData({ id: '', title: '', content: '', tags: '' });
            fetchAllContent(); // Refresh the list
        } catch (error: any) {
            setStatus({ message: `Error saving content: ${error.message}`, isError: true });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!deleteId) return;
        setIsLoading(true);
        try {
            const payload = { action: 'delete', id: deleteId };
            const res = await fetch(webAppUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
            const result = await res.json();
            if (result.status === 'error') throw new Error(result.message);
            setStatus({ message: result.message, isError: false });
            setDeleteId('');
            fetchAllContent(); // Refresh the list
        } catch (error: any) {
            setStatus({ message: `Error deleting content: ${error.message}`, isError: true });
        } finally {
            setIsLoading(false);
        }
    };

    // --- Render Logic ---
    if (!user) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
                 <header className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900">SheetDB Client</h1>
                    <p className="text-gray-600 mt-2">Please sign in to manage your sheet data.</p>
                </header>
                <div ref={signInContainerRef} className="flex justify-center mt-4"></div>
            </main>
        );
    }

    return (
        <main className="bg-gray-50 font-sans text-gray-800 min-h-screen">
            <div className="container mx-auto p-4 md:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900">SheetDB Client</h1>
                    <p className="text-gray-600 mt-2">Interact with your Google App Script CRUD API.</p>
                    <HitComponent />
                </header>
                
                <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mb-8 text-center">
                    <img src={user.picture} className="w-16 h-16 rounded-full mx-auto mb-4" alt="User Avatar" />
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                    <button onClick={handleSignOut} className="mt-4 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300 text-sm">Sign Out</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Add or Update Content</h2>
                            <form onSubmit={handleSave} className="space-y-4">
                                <input type="text" id="id" value={formData.id} onChange={handleFormChange} placeholder="ID (e.g., 1)" required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                                <input type="text" id="title" value={formData.title} onChange={handleFormChange} placeholder="Title" required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                                <textarea id="content" value={formData.content} onChange={handleFormChange} placeholder="Content" required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 h-24"></textarea>
                                <input type="text" id="tags" value={formData.tags} onChange={handleFormChange} placeholder="Tags (comma-separated)" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">Save (Create/Update)</button>
                            </form>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Delete Content</h2>
                            <form onSubmit={handleDelete} className="flex items-center gap-4">
                                <input type="text" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} placeholder="ID to Delete" required className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-red-500" />
                                <button type="submit" className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition duration-300">Delete</button>
                            </form>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Content from Sheet</h2>
                        <button onClick={fetchAllContent} className="w-full mb-4 bg-gray-700 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300">Fetch All Content</button>
                        {status && <div className={`mb-4 text-center p-3 rounded-md ${status.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{status.message}</div>}
                        {isLoading && <Loader />}
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {contentList.length > 0 ? contentList.map(item => <ContentCard key={item.id} item={item} />) : !isLoading && <p className="text-gray-500 text-center">No content found. Click fetch to load data.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

// You may need to declare the 'google' object on the window for TypeScript in a global .d.ts file
// For a quick setup, you can place it here, but a separate declaration file is better practice.
declare global {
    interface Window {
        google: any;
    }
}
