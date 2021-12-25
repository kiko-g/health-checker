import * as React from 'react'

export default function HeroImage(props) {
  const propClassName = props.propClassName || ''

  return (
    <div className={` ${propClassName}`}>
      <img
        className="w-full max-h-half object-cover"
        src={`https://dgaj.justica.gov.pt/portals/26/Images/FusionMedicalAnimation.jpg?ver=2020-03-25-182428-577`}
        alt=""
      />
    </div>
  )
}
