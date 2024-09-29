"use client";

import React, { useEffect, useRef, useState } from 'react';
import ColorPicker from 'react-pick-color';
import Range from './Range';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark as Dark } from 'react-syntax-highlighter/dist/esm/styles/prism/'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import useClickOutside from './ClickOutside';
import { colorLuminance } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

SyntaxHighlighter.registerLanguage('css', css)

const NeumorphismGenerator = () => {
    const [size, setSize] = useState(250);
    const [radius, setRadius] = useState(10);
    const [distance, setDistance] = useState(12);
    const [blur, setBlur] = useState(24);
    const [color, setColor] = useState('#e0e0e0');
    const [intensity, setIntensity] = useState(0.15);
    const [piker, setPiker] = useState(false);
    const [copied, setCopied] = useState(false);
    const borderRadius = radius + '%'


    const darkColor = colorLuminance(color, intensity * -1)
    const lightColor = colorLuminance(color, intensity)



    const [codeString, setCodeString] = useState(`background: ${color};
border-radius: ${borderRadius};
-webkit-border-radius: ${borderRadius};
box-shadow: ${distance}px ${distance}px ${blur}px ${darkColor},
-${distance}px -${distance}px ${blur}px ${lightColor};
-webkit-box-shadow: ${distance}px ${distance}px ${blur}px ${darkColor},
-${distance}px -${distance}px ${blur}px ${lightColor}`);

    const [tailwind, setTailwind] = useState("");

    const tabs = [
        {
            title: "CSS", content: codeString
        },
        { title: "Tailwind", content: tailwind },

    ];

    const [activeTab, setActiveTab] = useState(tabs[0].title);

    const handleSizeChange = ({ target: { value } }) => {
        setSize(value)
        setDistance(Math.round(value * 0.1))
        setBlur(Math.round(value * 0.2))
    }

    const handleDistance = ({ target: { value } }) => {
        setDistance(value)
        setBlur(value * 2)
    }


    const codeContainer = useRef();

    const copyToClipboard = () => {
        const el = codeContainer.current;
        el.select()
        el.setSelectionRange(0, 99999)
        navigator.clipboard.writeText(el.value);
        setCopied(true);
        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    useEffect(() => {
        setCodeString(`background: ${color};
border-radius: ${borderRadius};
-webkit-border-radius: ${borderRadius};
box-shadow: ${distance}px ${distance}px ${blur}px ${darkColor},
-${distance}px -${distance}px ${blur}px ${lightColor};
-webkit-box-shadow: ${distance}px ${distance}px ${blur}px ${darkColor},
-${distance}px -${distance}px ${blur}px ${lightColor};`);

        setTailwind(`bg-[${color}] 
rounded-[${borderRadius}] 
shadow-[${distance}px_${distance}px_${blur}px_${darkColor},-${distance}px_-${distance}px_${blur}px_${lightColor}]`)

    })

    const openRef = useClickOutside({ callback: setPiker });

    return (
        <div className='w-full h-full flex flex-col md:flex-row gap-y-6 gap-x-8 items-center justify-center my-20'>
            <AnimatePresence>
                <div
                    className='w-full rounded-lg h-[50vh] md:h-[80vh] md:min-w-[40%] flex items-center justify-center'
                    style={{ background: `${color}` }}
                >
                    {/* box */}
                    <motion.div
                        layout
                        style={{
                            height: `${size}px`,
                            width: `${size}px`,
                            borderRadius: `${borderRadius}`,
                            boxShadow: `${distance}px ${distance}px ${blur}px ${darkColor}, -${distance}px -${distance}px ${blur}px ${lightColor}`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                    </motion.div>
                </div>
            </AnimatePresence >
            <div className='w-full bg-white dark:bg-dark p-4 flex flex-col  justify-between gap-y-4 md:h-[80vh] md:min-w-[30%] md:w-full md:max-w-[40%] border border-bd dark:border-bdDark rounded-lg'>

                <div className='relative flex items-center justify-center gap-x-4' ref={openRef}>
                    Color: <button onClick={() => setPiker(!piker)} className='border border-bd dark:border-bdDark w-7 h-7 rounded-md' style={{
                        background: `${color}`
                    }}></button>

                    {piker &&
                        <div className='absolute top-8 z-20'>
                            <ColorPicker color={color} onChange={color => setColor(color.hex)} />
                        </div>}

                </div>


                <div>
                    <Range
                        label={'Size'}
                        value={size}
                        onChange={handleSizeChange}
                        min={10}
                        max={300}
                    />

                    <Range
                        label={'Radius'}
                        value={radius}
                        onChange={e => setRadius(e.target.value)}
                        min={0}
                        max={50}
                    />
                    <Range
                        label={'Distance'}
                        value={distance}
                        onChange={handleDistance}
                        min={5}
                        max={50}
                    />
                    <Range
                        label={'Blur'}
                        value={blur}
                        onChange={e => setBlur(e.target.value)}
                        min={0}
                        max={100}
                    />
                    <Range
                        label={'Intensity'}
                        value={intensity}
                        onChange={e => setIntensity(e.target.value)}
                        min={0.01}
                        step={0.01}
                        max={0.6}
                    />
                </div>


                <div className="relative text-sm bg-grey dark:bg-darkBlack rounded-lg pt-2 -pb-2 px-4">
                    <button className="absolute top-2 right-2   text-xl" onClick={copyToClipboard}>
                        <i className={` fi ${copied ? "fi-br-check-double" : "fi-rr-duplicate"} `}></i>
                    </button>
                    <div className='flex gap-x-2'>
                        {tabs.map((tab) => (
                            <button
                                key={tab.title}
                                onClick={() => setActiveTab(tab.title)}
                                className="relative rounded-full px-3 py-0.5 text-sm text-black dark:text-white">
                                {activeTab === tab.title && (
                                    <motion.span
                                        layoutId="bubble"
                                        className="absolute inset-0 z-10 bg-white mix-blend-difference"
                                        style={{ borderRadius: 9999 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                {tab.title}
                            </button>
                        ))}
                    </div>
                    {tabs.map((tab) => (
                        <div key={tab.title} >
                            {activeTab === tab.title &&
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, }}  // Set initial position outside the viewport on the right
                                    animate={{ opacity: 1 }}       // Animate towards the left (x: 0)   // Animate to move out to the left
                                    transition={{ duration: 0.3 }}
                                    className='w-full h-[200px] flex items-center justify-center'
                                >
                                    <textarea className='hidden' ref={codeContainer} value={tab.content} readOnly></textarea>
                                    <SyntaxHighlighter language="css" style={Dark}>
                                        {tab.content}
                                    </SyntaxHighlighter>
                                </motion.div>}
                        </div>

                    ))}
                </div>

            </div>
        </div>
    );
};

export default NeumorphismGenerator;
