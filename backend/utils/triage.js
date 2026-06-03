/**
 * Calculates a Triage Score (0-100+) based on vital signs and symptom severity.
 * Higher score = higher priority.
 */
function calculateTriageScore(patientData) {
  let score = 0;
  const { age, heartRate, bloodPressureSys, bloodPressureDia, symptomSeverity, activeBloodLoss } = patientData;

  // 1. Subjective Symptom Severity (0-10) is now a modifier, not the main driver. Max 30 points.
  score += (symptomSeverity || 0) * 3; 

  // Trauma override
  if (activeBloodLoss) {
    score += 60; // Massive emergency
  } 

  // 2. Age Vulnerability
  if (age < 1) {
    score += 15; // Infants are critical
  } else if (age < 5 || age > 65) {
    score += 10;
  }

  // 3. Heart Rate (Normal: 60-100)
  if (heartRate < 40 || heartRate > 130) {
    score += 40; // Critical: Bradycardia or Severe Tachycardia
  } else if (heartRate < 50 || heartRate > 110) {
    score += 20; // Urgent
  } else if (heartRate > 100) {
    score += 10; // Elevated
  }

  // 4. Systolic Blood Pressure (Normal: ~120)
  if (bloodPressureSys < 90 || bloodPressureSys >= 180) {
    score += 40; // Critical: Shock or Hypertensive Crisis
  } else if (bloodPressureSys >= 160) {
    score += 20; // Urgent
  } else if (bloodPressureSys >= 140) {
    score += 10; // Elevated
  }

  // 5. Diastolic Blood Pressure (Normal: ~80)
  if (bloodPressureDia >= 120) {
    score += 30; // Critical
  } else if (bloodPressureDia >= 100 || bloodPressureDia < 60) {
    score += 15; // Urgent
  }

  return score;
}

module.exports = { calculateTriageScore };
