'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';

import logo from 'public/logo.png';
import DropdownItem from './menu/dropdownItem';
import Dropdown from '../portal/dropdown';

export default function MobileHeader() {
  const pathname = usePathname();
  const [isShow, setIsShow] = useState(false);

  const handleDropdownButton = () => {
    setIsShow(!isShow);
  };

  const isStudyPage = pathname.startsWith('/study');
  const headerBackgroundColor = isStudyPage ? 'bg-stone-800' : 'bg-white';

  return (
    <header className="mobileHeader">
      <div
        className={`flex h-[70px] w-full items-center justify-between border border-b-2 px-10 ${headerBackgroundColor} *:[516px]:text-8 *:text-14  *:xl:text-16`}
      >
        <Link href={'/'}>
          <Image src={logo as StaticImageData} alt="logo" className="w-[100px]" />
        </Link>

        <div className={`flex items-center gap-spacing-07`}>
          <div>
            <Dropdown
              isOpen={isShow}
              onClose={handleDropdownButton}
              trigger={
                <button
                  onClick={handleDropdownButton}
                  className={`border/10 rounded-radius-04 border px-spacing-06 py-[5px] ${isShow && 'rounded-b-none'}`}
                >
                  <IoIosMenu size={30} />
                </button>
              }
            >
              <DropdownItem />
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}
