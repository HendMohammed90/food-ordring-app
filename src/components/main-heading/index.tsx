function MainHeading({ title, subTitle }: { title: string; subTitle: string }) {
    return (
        <>
            <span className='uppercase text-primary font-semibold leading-4 underline'>
                {subTitle}
            </span>
            <h2 className='mt-5 text-chart-5 font-bold text-4xl italic'>{title}</h2>
        </>
    );
}

export default MainHeading;