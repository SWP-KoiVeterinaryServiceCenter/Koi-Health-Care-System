// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllmedicalRecordsThunk } from '../../../../store/apiThunk/medicalRecord';
// import { medicalRecordsSelector } from '../../../../store/sellectors';
// import { useLocation } from "react-router-dom";
// import "./prescriptionList.css";

// export default function PrescriptionList() {
//   const location = useLocation();
//   const { id } = location.state || {}; // Destructure to get the 'id' from state
//   console.log(id);

//   return (
//     <div className="prescriptionList">
//       <header className="prescriptionList__header">
//         <h1 className="prescriptionList__title">PRESCRIPTION</h1>
//         <p className="prescriptionList__subtitle">
//           A Koi fish prescription is a treatment plan from an aquatic
//           veterinarian, detailing medications, dosage, and care instructions to
//           address health issues. It ensures proper recovery through specific
//           guidelines on medication and care.
//         </p>
//       </header>

//       <div className="menuCards1">
//         <ul className="menuCards1_cards">
//           <li className="menuCards1_cardsItem">
//             <div className="menuCards1_card">
//               <div className="menuCards1_cardImage">
//                 <img
//                   src="https://cdn.shopify.com/s/files/1/1083/2612/files/koi2_480x480.jpg?v=1719301650"
//                   alt="mixed vegetable salad in a mason jar. "
//                 />
//               </div>
//               <div className="menuCards1_cardContent">
//                 {/* <h2 className="menuCards1_cardTitle">
//                   PRESCRIPTION &#x2022; $9
//                 </h2> */}
//                 <div className="menuCards1_cardText">
//                   <p>- Symptoms : API here</p>
//                   <p>- Diagnosis : API here</p>
//                   <p>- TreatmentGiven : API here</p>
//                   <p>- TestResults : API here</p>
//                   <p>
//                     - Notes : Served with your choice of dressing on the side:
//                     housemade ranch, cherry balsamic vinaigrette, creamy
//                     chipotle, avocado green goddess, or honey mustard. Add your
//                     choice of protein for $2 more.{" "}
//                   </p>
//                   <p>- PrescriptionModel: medicalName, dosage (liều),frequency (ngày),duration</p>
//                   <p>- Instructions: API here</p>
//                 </div>
//               </div>
//             </div>
//           </li>

//           <li className="menuCards1_cardsItem">
//             <div className="menuCards1_card">
//               <div className="menuCards1_cardImage">
//                 <img
//                   src="https://cdn.shopify.com/s/files/1/1083/2612/files/koi2_480x480.jpg?v=1719301650"
//                   alt="a Reuben sandwich on wax paper. "
//                 />
//               </div>
//               <div className="menuCards1_cardContent">
//                 <h2 className="menuCards1_cardTitle">
//                   PRESCRIPTION &#x2022; $18
//                 </h2>
//                 <div className="menuCards1_cardText">
//                   <p>
//                     All great meals take time, but this one takes it to the next
//                     level! More than 650 hours of fermenting, brining, aging,
//                     and curing goes into each and every one of our legendary
//                     Reuben sandwiches.
//                   </p>
//                   <p>
//                     Every element of this extraordinary sandwich is handcrafted
//                     in our kitchens, from the rye bread baked from our secret
//                     recipe to the cave-aged Swiss cheese, right down to the
//                     pickle. The only thing we didn't make on the premises is the
//                     toothpick ( but we're looking into how to do that).{" "}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </li>
//           <li className="menuCards1_cardsItem">
//             <div className="menuCards1_card">
//               <div className="menuCards1_cardImage">
//                 <img
//                   src="https://cdn.shopify.com/s/files/1/1083/2612/files/koi2_480x480.jpg?v=1719301650"
//                   alt="A side view of a plate of figs and berries. "
//                 />
//               </div>
//               <div className="menuCards1_cardContent">
//                 <h2 className="menuCards1_cardTitle">
//                   PRESCRIPTION &#x2022; $16
//                 </h2>
//                 <div className="menuCards1_cardText">
//                   <p>
//                     <span className="menuCards1_note">Seasonal.</span>
//                   </p>
//                   <p>
//                     A succulent sextet of fresh figs join with a selection of
//                     bodacious seasonal berries in this refreshing, shareable
//                     dessert.
//                   </p>
//                   <p>
//                     Choose your drizzle: cherry-balsamic vinegar, local honey,
//                     or housemade chocolate sauce.{" "}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllmedicalRecordsThunk } from '../../../../store/apiThunk/medicalRecord';
import { medicalRecordsSelector } from '../../../../store/sellectors';
import { useLocation } from "react-router-dom";
import "./prescriptionList.css";
import koiFishImage from '../../../../assets/koi_fish_prescription_health_logo.png'; // Import the image

export default function PrescriptionList() {
  const location = useLocation();
  const { id } = location.state || {}; // Destructure to get the 'id' from state
  console.log(id);

  const dispatch = useDispatch();
  const medicalRecords = useSelector(medicalRecordsSelector);

  useEffect(() => {
    if (id) {
      dispatch(getAllmedicalRecordsThunk(id));
    }
  }, [dispatch, id]);

  return (
    <div className="prescriptionList">
      <header className="prescriptionList__header">
        <h1 className="prescriptionList__title">PRESCRIPTION</h1>
        <p className="prescriptionList__subtitle">
          A Koi fish prescription is a treatment plan from an aquatic
          veterinarian, detailing medications, dosage, and care instructions to
          address health issues. It ensures proper recovery through specific
          guidelines on medication and care.
        </p>
      </header>

      <div className="menuCards1">
        <ul className="menuCards1_cards">
          {medicalRecords.map((record) => (
            <li key={record.recordId} className="menuCards1_cardsItem">
              <div className="menuCards1_card">
                <div className="menuCards1_cardImage">
                  <img
                    src={koiFishImage}
                    alt="Colorful Koi fish swimming"
                   style={{width:"310px"}}
                  />
                </div>
                <div className="menuCards1_cardContent">
                           <h2 className="menuCards1_cardTitle">
                PRESCRIPTION &#x2022; $9
                </h2>
                  <div className="menuCards1_cardText">
                    <p>- Symptoms: {record.symptoms}</p>
                    <p>- Diagnosis: {record.diagnosis}</p>
                    <p>- TreatmentGiven: {record.treatmentGiven}</p>
                    <p>- TestResults: {record.testResults}</p>
                    <p>- Notes: {record.notes}</p>
                    <p> PrescriptionModel:</p>
                    {record.createPrescriptionModel.map((prescription, index) => (
                      <div key={index}>
                        <p>Medical Name: {prescription.medicalName}</p>
                        <p>Dosage: {prescription.dosage}</p>
                        <p>Frequency: {prescription.frequency}</p>
                        <p>Duration: {prescription.duration}</p>
                        <p>Instructions: {prescription.instructions}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}