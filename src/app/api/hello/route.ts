import axios from 'axios';
import { NextResponse } from 'next/server';

// The URL of your deployed Google App Script.
// It's a good practice to store this in an environment variable (e.g., process.env.GOOGLE_SCRIPT_URL)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxK5mlYEvrYRvvj6iJhigSN1MB7SikrhXUaKDyjwhYO0pz4QzxFVBv9JpdYc9AoQBUu/exec';
const COOKIE = 'SEARCH_SAMESITE=CgQI6Z4B; OSID=g.a0001ggXntkg6K7-CKBAAYmtqztEYz71qrZhHGOL3vXwfCYKoLUUNHYdlnCFunGtYtGuxSbNaQACgYKATISARESFQHGX2Mio2dyRd-LVjgGScfeWoXPtRoVAUF8yKq907Q5htvD3Ku8o9UBz9mA0076; __Secure-OSID=g.a0001ggXntkg6K7-CKBAAYmtqztEYz71qrZhHGOL3vXwfCYKoLUUQskHxp6wwM6JytgQQSswyAACgYKAbkSARESFQHGX2MiREmGqujVS8PEw4r4PjRAyxoVAUF8yKr-UxbiDO6y-O7ajnxRbSSc0076; OTZ=8269066_28_28__28_; S=billing-ui-v3=T29VxUE3Yx0iSJMCrlB9wBI3OmDF0EeU:billing-ui-v3-efe=T29VxUE3Yx0iSJMCrlB9wBI3OmDF0EeU:maestro=QZhe19o42Qb2sUfAq9ceszYJLN5Ga4vGw4tIMMAFuSU; _ga=GA1.3.171843673.1758447941; SID=g.a0002QgXnns7AokLe3yhOX6m5Qn2kJQgDv8kjHAqeHRUSFq5NJKq3FwSzsAV9TU1OM61FCdIrwACgYKAUoSARESFQHGX2MiiC6TI6XiugJajiFQC8MwGhoVAUF8yKpL9pxMwmcQNuTsLGZaIFrn0076; __Secure-1PSID=g.a0002QgXnns7AokLe3yhOX6m5Qn2kJQgDv8kjHAqeHRUSFq5NJKqQ8D0Ua8WxrKKV_vNW5o04QACgYKAYkSARESFQHGX2MilJcWNobbHdV-1HEsUnLbdxoVAUF8yKrxo4_2hHqpKybQG1aEtajw0076; __Secure-3PSID=g.a0002QgXnns7AokLe3yhOX6m5Qn2kJQgDv8kjHAqeHRUSFq5NJKq5msX42ltqQrUroHj06zTlgACgYKAVESARESFQHGX2MiVpgVcKmm_C9YgzjlWul_SxoVAUF8yKoN9tBeD3bkE7tdYxPuw8oL0076; HSID=AiB6YbB4llkKuVKJu; SSID=ATr-joodoGsdiX3m2; APISID=hAqrMJyvD4VKAXX2/AJcmEvYqvvgu_SfIV; SAPISID=OWOG1Dua2dPAWRhH/Ar9cI_sk1Q7JnR-it; __Secure-1PAPISID=OWOG1Dua2dPAWRhH/Ar9cI_sk1Q7JnR-it; __Secure-3PAPISID=OWOG1Dua2dPAWRhH/Ar9cI_sk1Q7JnR-it; __gsas=ID=8abb359002b37573:T=1760209629:RT=1760209629:S=ALNI_Mb3I_FHShcJhiW0kOk0wrAZsQYvuA; AEC=AaJma5sLGYMfz1G6z-vjCHsKghYYIEOX6iuwXq43CysuaXjd-hImenGqAaM; __Secure-1PSIDTS=sidts-CjEBmkD5S7y2cnR-sJ61KSj-Dca3cIAkqyAQ2OSXHcUBARAsCLqRleGrQQI3cwuMl31XEAA; __Secure-3PSIDTS=sidts-CjEBmkD5S7y2cnR-sJ61KSj-Dca3cIAkqyAQ2OSXHcUBARAsCLqRleGrQQI3cwuMl31XEAA; NID=525=U_BqjbG3_cmZ7ipbILkvWs0REgyuZnncpzx75TUK9MpCz0myBAwksnojMIXHYpmziQh4LECRKA5i3yh9gUHOmzZYpsHS4W9ggTwHcoZG3z9ycIO-ky-didf4fPG1g3tW2QI56pa-0-sVrWcZ4c6qDg-zL_Y3Q24cAEJOXZbvBCwjkOJ2eIKp_9V3WKwwFtgqBSii81AYKusb6xBpUYizPEOFco9x4KQfK_0axpnHfEOED6bPN7hLvaDbEcSckWU8MzQrIEFJvg84Fhv9xlOnR0h8_7J1vdNqZA-_vV3syJZXOd-47LngScw7obK2jOM7dU3NOv7sHhwPcO2cW7vZC6M8y-Vg8tPWfOdMG7MKUJRJGTyCBcoCLRarDa6jCPmmU4p9fdK_7CXBbPKHFLtlBg-_5FEeDerujFjrjWQuDomb4nmrtnVoigij5cz46EQaIvKWoBQ_6pM3oBWprN30ZSlVYwYkjJRe2ZWAS3bJ-j5Zw4f6EUZ50huhz3qtV0ZyRrFeMX4IaT5I9JYI1QNN-6zAVFt6yQCtVrIGg3oQy4hxhs50vLLDu8NsWDH3gc73WWcOZVtfjiLkjlNU_b_a0BnWypr98J3nuvk3L-9xumsry50ceyDa5sDwaTqqjKRslu67f4HzXv5o0SaCmwqJscknO5cQzWmNrm_JXNDjT05T1Uoig3KyRrzX1HskHuWLHWv7zXRFuYCKfmn7_pu2UTLfW6M5dheyVI0tGoMZGyzjph1a79iAgTDGYL5drIUgHGVGb2PvS3nX10PkUeR4mJ61EGgPwzkLGF9UbUufREz6ALzK7tf1OIdm_G9GmVuidXeL4lsubdpw4n5KcVbOu9R3izkdu1L5awg0ZGOw_zznJSRaXLWBDpyZRZaKYt8kj352YcN-GkidRn7BmM9nP24mCKyxMFq3tLEBz5zL3-YyujUVGwbOU-IhquW07G7a0x-jRh6o6681AKKCV47gEF1xIjF0heExDa_IXxnF39l2PwmIdFt7MHT_afCdr15Xwn5nYr0XTNQnoXH9AbUH3X23ndrdPAgl0D_2wUuom6QSbXEAXVJ9a3R-qkoiVrfQKMbIjzIXEO1MgSLtT2hoD1tzwsOIU2ROnvne6OAvlWZChbcjdF-jrE8pZQ; _ga_60Q1X42Z2X=GS2.1.s1760375879$o8$g0$t1760375879$j60$l0$h0; _ga_S6TL92G5N1=GS2.1.s1760375879$o8$g0$t1760375879$j60$l0$h0; SIDCC=AKEyXzW8wirD8YZai0g9d0g1Ouz_qIauQyUhLi2PSmEvIcDokLAJEs--N7qR6K36i9yFyWLVbUA; __Secure-1PSIDCC=AKEyXzXpJ7SXSN32ztot_MUqvlgbfwX5Ja98y5XYdtExaSMPiqSdKJbWf_5jUOHEa3Fl78CnVg; __Secure-3PSIDCC=AKEyXzVu3OrZBj06vcJXY2dRM8I_-3ZfGo2Gnk7QSdoYRHfdKz7HIEfYjlvJx-CrA928g7lKfNNi'

/**
 * Handles GET requests to this API route.
 * Forwards the request to the Google App Script using axios.
 * @param {Request} request The incoming request object from the client.
 * @returns {Promise<NextResponse>} The response from the Google App Script.
 */
export async function GET(request: Request) {
    // Extract search parameters (e.g., ?id=1) from the incoming request
    const { searchParams } = new URL(request.url);
    const fullUrl = `${GOOGLE_SCRIPT_URL}?${searchParams.toString()}`;

    try {
        // Prepare headers to forward from the client, including the Cookie.
        const requestHeaders: HeadersInit = {};
        const cookie = request.headers.get('cookie');
        requestHeaders['Cookie'] = COOKIE;
        // if (cookie) {
        //     requestHeaders['Cookie'] = cookie;
        // }

        // First, make a request but tell fetch not to follow the redirect automatically.
        let redirectionResponse = await fetch(fullUrl, {
            headers: requestHeaders,
            redirect: 'manual',
        });

        let counter = 0;
        // Check if the response is a redirect (status codes 301, 302, 307 etc.)
        while (redirectionResponse.status >= 300 && redirectionResponse.status < 400) {
            // console.log('redirected', ++counter);
            const redirectUrl = redirectionResponse.headers.get('Location');

            if (!redirectUrl) {
                throw new Error('Redirect response was received, but no location header was found.');
            }

            console.log('redirectUrl', ++counter, redirectUrl)
            // Now, make a second request to the new URL, also forwarding the cookies.
            redirectionResponse = await fetch(redirectUrl, {
                headers: requestHeaders,
                redirect: 'manual',
            });
        }

        // If the initial response was not a redirect, process it directly.
        if (!redirectionResponse.ok) {
             throw new Error(`Initial request failed: ${redirectionResponse.statusText}`);
        }
        
        const data = await redirectionResponse.json();
        return NextResponse.json(data);
        

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || error.message;
            return NextResponse.json({ status: 'error', message: `Google Script Error: ${message}` }, { status });
        }
        // Something happened in setting up the request that triggered an Error
        return NextResponse.json(
            { status: 'error', message: error.message || 'An internal server error occurred.' },
            { status: 500 }
        );
    }
}


/**
 * Handles POST requests to this API route.
 * Forwards the request (with its body) to the Google App Script using axios.
 * @param {Request} request The incoming request object from the client.
 * @returns {Promise<NextResponse>} The response from the Google App Script.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Use axios.post to forward the request with the JSON body
        const response = await axios.post(GOOGLE_SCRIPT_URL, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        return NextResponse.json(response.data);

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || error.message;
            return NextResponse.json({ status: 'error', message: `Google Script Error: ${message}` }, { status });
        }
         return NextResponse.json(
            { status: 'error', message: error.message || 'An internal server error occurred.' },
            { status: 500 }
        );
    }
}
