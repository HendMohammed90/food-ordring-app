import MainHeading from "@/components/main-heading"
import Menu from "@/components/menu"




const BestSellers = async ({ bestSellerData }: { bestSellerData: any }) => {

    // console.log(bestSellerData)

    return (
        <section>
            <div className="container">
                <div className="text-center mb-4">
                    <MainHeading subTitle={'checkout'} title={'Our Best Sellers'} />
                </div>
                <Menu items={bestSellerData} />
            </div>
        </section>
    )
}

export default BestSellers