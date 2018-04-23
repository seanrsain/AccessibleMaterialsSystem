const map = {
  "Languages": {
    "0": "English",
    "1": "Spanish",
    "2": "French"
  },
  "StudentStatus": {
    "0": "Pending",
    "1": "Active",
    "2": "Inactive"
  },
  "OrderStatus": {
    "0": "Pending",
    "1": "Approved", 
    "2": "Canceled",
    "3": "On hold",
    "4": "Waiting to ship",
    "5": "Shipped",
    "6": "Past due",
    "7": "Returned"
  },
  "DisabilityStatus": {
    "0": "Blind (MDB)",
    "1": "Blind (FDB)",
    "2": "Visually Impaired",
    "3": "Physically Disabled",
    "4": "Learning Disability (organic)"
  },
  "Districts": {
    "1": "Atlanta Public Schools",
    "2": "Brantley School District",
    "3": "Effingham School District",
    "4": "Fannin School District",
    "5": "Elbert School District"
  }
}

export const district = (id) => map.Districts[id]
export const disability = (id) => map.DisabilityStatus[id]
export const studentStatus = (id) => map.StudentStatus[id]
export const orderStatus = (id) => map.OrderStatus[id]