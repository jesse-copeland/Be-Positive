BloodType = {
  
  AB_POS : "AB_POS",
  AB_NEG : "AB_NEG",
  A_POS  : "A_POS",
  A_NEG  : "A_NEG",
  B_POS  : "B_POS",
  B_NEG  : "B_NEG",
  O_POS  : "O_POS",
  O_NEG  : "O_NEG"

};

BloodTransfusionRules = {
  
  /**
   * Set the simulation speed.
   * @type {Number} : Valid values between 1 and 200
   */
  simulation_speed : 200,

  /**
   * returns BloodType, or false to give no BloodType
   * 
   * @name receive_patient
   * @param {Bank} blood_inventory
   * @param {Patient} patient
   * @returns {BloodType or false}
   *
   * Patient properties {
   *   gender : String, (MALE,FEMALE)
   *   blood_type : String (BloodType)
   * }
   * 
   * Bank properties {
   *   AB_POS : Integer,
   *   AB_NEG : Integer,
   *   A_POS  : Integer,
   *   A_NEG  : Integer,
   *   B_POS  : Integer,
   *   B_NEG  : Integer,
   *   O_POS  : Integer,
   *   O_NEG  : Integer
   * }
   * 
   */

  receive_patient : function (blood_inventory, patient) {
    
    var bloodArray = [];

    var reA = /^A_/;
    var reB = /^B_/;
    var reAB = /^AB_/;
    var rePOS = /POS$/;
    var reNEG = /NEG$/;
    var pbt = patient.blood_type;  

    switch (pbt) {

      case "AB_POS":
        bloodArray.push("AB_POS");

      case "AB_NEG":
        bloodArray.push("AB_NEG");
      
      case "A_POS":
        if ((reA.test(pbt) || reAB.test(pbt)) && rePOS.test(pbt))
          bloodArray.push("A_POS");
      
      case "A_NEG":
        if (reA.test(pbt) || reAB.test(pbt))
          bloodArray.push("A_NEG");
      
      case "B_POS":
        if ((reB.test(pbt) || reAB.test(pbt)) && rePOS.test(pbt))
          bloodArray.push("B_POS");

      case "B_NEG":
        if (reB.test(pbt) || reAB.test(pbt))
          bloodArray.push("B_NEG");
      
      case "O_POS":
        if (rePOS.test(pbt))
          bloodArray.push("O_POS");
      
      case "O_NEG":
          bloodArray.push("O_NEG");

    }

    var mostBloodCount = 0;
    var mostBloodType = '';

    for (var i = 0; i < bloodArray.length; i++) {
      if (blood_inventory[bloodArray[i]]) {
        if (blood_inventory[bloodArray[i]] > mostBloodCount) {
          mostBloodCount = blood_inventory[bloodArray[i]];
          mostBloodType = bloodArray[i];
        }
      }
    }
    
    if (mostBloodCount) {
      return mostBloodType;
    } else {
      return false;
    }
  }

};