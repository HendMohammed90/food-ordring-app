import { Routes } from '@/constants/enums';
import MainHeading from '../main-heading';

const About = () => {
  return (
    <section className='section-gap' id={Routes.ABOUT}>
      <div className='container text-center'>
        <MainHeading subTitle="ourStory" title="About Us " />
        <div className='text-primary max-w-md mx-auto mt-4 flex flex-col gap-4'>
          <p>Welcome to Pizza Palace, where passion meets flavor! Since our founding, we've been dedicated
            to crafting the perfect pizza experience for our customers. Our journey began with a simple
            mission: to serve authentic, delicious pizzas made with the finest ingredients.</p>
          <p>Every pizza we make is a testament to our commitment to quality. From our hand-tossed dough
            to our signature sauces, we ensure that each bite delivers an unforgettable taste experience.</p>
          <p>We believe that great food brings people together, and we're honored to be part of your
            special moments, whether it's a family dinner, a celebration with friends, or a quick
            lunch break.</p>
        </div>
      </div>
    </section>
  );
}

export default About