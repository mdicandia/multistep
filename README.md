# Multistep

This is controlled multistep component based on chakra UI Tabs, this project uses NextJs, react-hook-form, tanstack table and react-datepicker.

## Try it out

Visit [https://multistep-beige.vercel.app/](https://multistep-beige.vercel.app/)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

The component accepts these props:

* `steps`: The number of tabs that the step will have, which also reflects its state.
* `stepsConfig`: The configuration of the multistep. It takes each of the steps of the steps array types as a key and has these properties:
    * `id`: The tabIndex of the multistep.
    * `title`: The tab title.
    * `content`: The content of the step in the tab panel.
    * `buttonText`: The button text.
    * `buttonType`: This can be either `submit` or `button`.
    * `buttonColor`: The color of the button, using `colorScheme` of the button.
    * `footer`: This array represents the elements that will have the footer. The object has id, text of the button, an icon, and also a modal (not implemented).
    * `onNextStep`: This function will be executed when the button is clicked. (In this case makes a POST request to set the state of the step as completed)

The first step has a form that is not connected, but has everything already built on. The unit options get populated by an endpoint (`/api/units`). The second step has a TanStack table that is not editable but could be, and it gets populated by another endpoint (`/api/table`). The third step has a reminder component that is hardcoded. There is also a Reset Steps built on that makes a POST to (`/api/steps`) and resets the steps that are controlled by the API.

## Decisions
I decided to use Next.js because it's really easy to deploy and also because it provides the possibility of having an API built-in. I used Chakra UI Tabs because it was faster and it was pretty close to the mockup, and I could also use Buttons and other components out of the box. React Hook Form is a library that I use regularly and it is very convenient, the same for TanStack table and React Datepicker.

## Next Improvements
I would make these improvements:
* Make it more responsive (right now with 3 steps it looks acceptable on mobile, thanks to the scrolling, but it would be nice to make the steps vertical when on mobile)
* Connect the `Form`.
* Make some of the table cells editable.
* Make the `Reminder` dynamic.
* Make the component more dynamic, by adding possible properties to the `stepsConfig` (like `contentFields`, or `contentAPI` to receive the API that we need to use to get the content populated).
* Add the `Modal` for the `Footer` elements.
* Add `option` prop for the three dots menu.
* Add tests and error detection to the component and, more importantly, the form.
