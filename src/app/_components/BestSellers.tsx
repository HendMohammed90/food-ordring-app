import MainHeading from "@/components/main-heading"
import Menu from "@/components/menu"
import { db } from "@/lib/prisma";
import { ProductWithRelations } from "@/types/product";


const BestSellers = async ({ bestSellerData }: { bestSellerData: ProductWithRelations[] }) => {

    // const size = await db.size.create({
    //     data: {
    //         name:"SMALL",
    //         price: 10,
    //         Product: {
    //             connect: {
    //                 id: "cme14g8dp00003ei0n93c36tr"
    //             }
    //         }
    //     }
    // })

    // console.log(size)

    // const extraData = await db.extra.create({
    //     data: {
    //         name: "CHEESE",
    //         price: 1,
    //         Product: {
    //             connect: {
    //                 id: "cme14g8dp00003ei0n93c36tr"
    //             }
    //         }
    //     }
    // });

    // console.log(extraData);

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