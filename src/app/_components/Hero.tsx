import Link from "@/components/link"
import { buttonVariants } from "@/components/ui/button"
import { Routes } from "@/constants/enums"
import { ArrowRightCircle } from "lucide-react"
import Image from "next/image"

const Hero = () => {
    return (
        <section className="section-gap">
            <div className="container flex flex-column items-center gap-12 mb-16 justify-between">
                <div className="md:py-12 w-full md:w-1/2">
                    <h1 className='text-4xl font-semibold'>Slice into Happiness</h1>
                    <p className='text-primary my-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus recusandae id laudantium. Vel maxime dignissimos, illo minima earum accusamus perferendis. Quas, esse recusandae! Placeat cum temporibus, assumenda eaque dolores labore.
                    </p>
                    <div className='flex items-center gap-4'>
                        <Link
                            href={`/${Routes.MENU}`}
                            className={`${buttonVariants({
                                size: 'lg', variant: 'outline'
                            })} space-x-2 !px-8 !rounded-full uppercase bg-chart-5 text-background hover:text-background hover:bg-chart-1`}
                        >
                            Order Now
                            <ArrowRightCircle
                                className={`!w-5 !h-5`}
                            />
                        </Link>
                        <Link
                            href={`/${Routes.ABOUT}`}
                            className={`${buttonVariants({
                                size: 'lg', variant: 'outline'
                            })} space-x-2 !px-8 !rounded-full text-primary hover:bg-chart-5 duration-200 font-semibold  hover:text-background`}
                        >
                            Learn More
                            <ArrowRightCircle
                                className={`!w-5 !h-5`}
                            />
                        </Link>
                    </div>
                </div>
                <div className="relative md:h-[24rem] md:w-[24rem] hidden md:block">
                    <Image src={"/assets/images/pizza-hero.png"} alt="PizzaImg" fill loading="eager" priority className="object-contain"/>
                </div>
            </div>
        </section >
    )
}

export default Hero