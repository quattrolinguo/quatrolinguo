import Icon from '@mdi/react';
import { mdiSchoolOutline } from '@mdi/js';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="flex justify-between items-center w-screen h-20 px-6 pt-3 bg-transparent">
            <div
                className="absolute -ml-1 pl-0 pt-3 overflow-visible"
                style={{ width: '114px', height: '114px' }}
                viewBox="0 0 114 114"
            >
                <Icon path={mdiSchoolOutline} size={4} color='#B91C1C'></Icon>
            </div>
            <div className="text-white text-left font-semibold text-3xl pl-8" style={{ opacity: '0.9' }}>
                Quattro
            </div>
            <div className="px-6 pl-20">
                <div className="flex flex-row gap-8 items-center justify-start ">
                    <div className="text-white text-left font-normal text-xl relative">
                        <Link href="/">Home</Link>
                    </div>
                    <div className="text-white text-left font-normal text-xl relative">
                        <Link href="/">Payment</Link>
                    </div>
                    <div className="text-white text-left font-normal text-xl relative">
                        <Link href="/">Features</Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-6 items-center justify-start">
                <div className="text-dark-dark text-left font-medium text-xl leading-6 relative">
                    Login
                </div>
                <div className="bg-[#dc2626] rounded-lg pt-2 px-4 pb-2 flex flex-row gap-2.5 items-center justify-center">
                    <div className="text-white text-center font-medium text-2xl leading-6 relative flex items-center justify-center">
                        Register
                    </div>
                </div>
            </div>
        </div>
    );
}