'use client'
import Image from 'next/image';
import React from 'react';

function PersonCard() {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg" src="https://media.licdn.com/dms/image/C5603AQGBvN24gwaSlQ/profile-displayphoto-shrink_800_800/0/1662425424769?e=1715212800&v=beta&t=R_K9KrhvxP2MG-fiVNmbvXqbd8q8avWe-bRLrPZ1Oso" alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">John Maxwell</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Ex-Software Engineer Intern @ Siemens EDA | CS @ PSU</p>
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Linkedin
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
  );
}

export default PersonCard;