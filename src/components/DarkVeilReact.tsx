import DarkVeil from '@/components/DarkVeil'


export function DarkVeilReact({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full h-full'>
            <div className='absolute h-[600px] w-full'>
                <DarkVeil
                    hueShift={0}
                    noiseIntensity={0}
                    scanlineIntensity={0}
                    speed={1.2}
                    scanlineFrequency={0}
                    warpAmount={0}

                />
            </div>
            {children}
        </div>
    )
}
