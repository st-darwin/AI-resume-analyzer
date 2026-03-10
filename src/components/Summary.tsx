
import ScoreGauge from './ScoreGauge'
import ScoreBadge from './ScoreBadge'
const Category = ({title , score } : {score : number , title : string}) =>{
    const textColor = score > 70 ? "text-green-600" 
    : score > 49 ? "text-yellow-600" : "text-red-600" 
   return(
    <div className='resume-summary'>
     <div className='category '>
     <div className='flex flex-row gap-2 items-center justify-center'>
         <p>{title}</p>
         <ScoreBadge score={score}/>
     </div>
     </div>
     <p className=''>
        <span className={textColor}>{score}%</span>
     </p>

    </div>
   )
}


const Summary = ({feedback} : {feedback : Feedback}) => {
  return (
    <div className='bg-white rounded-2xl  w-full '>
      <div className='flex flex-row items-center p-2 gap-8 ' >
        <ScoreGauge score={feedback.overallScore}/>
        <div className='flex flex-col gap-2 ' >
        <h2 className='text-2xl font-semibold'>Your Resume Score</h2>
        <p className=' text-[0.8rem]  md:text-sm text-gray-500 '>
            This Score is calcuated based on the variable below 
        </p>
        </div>
      </div>
      <Category title='Tone & Style' score={feedback.toneAndStyle.score}/>
      <Category title='Content' score={feedback.content.score}/>
      <Category title='Structure' score={feedback.structure.score}/>
      <Category title='Skills' score={feedback.skills.score}/>
    </div>
  )
}

export default Summary
