import Icon from '@mdi/react';
import { mdiSchoolOutline } from '@mdi/js';

export default function Navbar() {
    return (
        <div className="flex justify-between items-center w-full h-20 px-4 relative bg-transparent">
            <div
                className="absolute pl-2 pt-3 overflow-visible"
                style={{ width: '114px', height: '114px' }}
                viewBox="0 0 114 114"
            >
                <Icon path={mdiSchoolOutline} size={4} color='#B91C1C'></Icon>
            </div>
            <div className="absolute right-[0%] left-[2.7%] w-[97.3%] bottom-[22.81%] top-[26.32%] h-[50.88%]">
                <div className="flex flex-row gap-10 items-center justify-start absolute right-[40.61%] left-[36.05%] w-[23.34%] bottom-[16.6%] top-[23.4%] h-[60%]">
                    <div className="text-white text-left font-medium text-2xl leading-6 relative">
                        Home
                    </div>
                    <div className="text-white text-left font-medium text-2xl leading-6 relative">
                        Payment
                    </div>
                    <div className="text-white text-left font-medium text-2xl leading-6 relative">
                        Features
                    </div>
                </div>
                <div className="flex flex-row gap-[22px] items-center justify-start absolute right-[0%] left-[84.53%] w-[15.47%] bottom-[0%] top-[0%] h-[100%]">
                    <div className="text-dark-dark text-left font-medium text-2xl leading-6 relative">
                        Login
                    </div>
                    <div className="bg-[#dc2626] rounded-lg pt-2 pr-6 pb-2 pl-6 flex flex-row gap-2.5 items-center justify-center relative">
                        <div className="text-white text-center font-medium text-2xl leading-6 relative flex items-center justify-center">
                            Sign Up
                        </div>
                    </div>
                </div>
                <div className="text-white text-left font-semibold text-5xl leading-6 absolute right-[76.64%] left-[0%] w-[23.36%] bottom-[17.9%] top-[31.03%] h-[51.06%]" style={{ opacity: '0.9' }}>
                    Quattro
                </div>
            </div>
        </div>
    );
}