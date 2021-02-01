async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)

let outputElement =document.querySelector('.rides')

    for ( let i=0; i<json.length; i++) {
    let ride = json[i]
    levelService(ride)
    rideformat(ride)
    }    

// This function puts all levels of Service into the correct format

function levelService(ride){
  if (ride.length > 1) {
    levelOfService = 'Noober Pool'
  } else if (ride[0].purpleRequested) {
    levelOfService = 'Noober Purple'
  } else if (ride[0].numberOfPassengers > 3) {
    levelOfService = 'Noober XL'
  } else {
    levelOfService = 'Noober X'
  }
      outputElement.insertAdjacentHTML('beforeend',`
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
      <i class="fas fa-car-side"></i>
      <span>${levelOfService}</span>
      </h1>`)
  }

// This function puts all ride info into the correct format

  function rideformat(ride){
   for(let j=0;j<ride.length;j++) {
    
    // Naming variables

    let leg = ride[j]
    PassengerName = leg.passengerDetails.first + [" "] + leg.passengerDetails.last
    phone = leg.passengerDetails.phoneNumber
    passengers = leg.numberOfPassengers
    pickupLine1 = leg.pickupLocation.address
    pickupLine2 = leg.pickupLocation.city + [", "] + leg.pickupLocation.state + [" "] + leg.pickupLocation.zip
    dropoffLine1 = leg.dropoffLocation.address
    dropoffLine2 = leg.dropoffLocation.city + [", "] + leg.dropoffLocation.state + [" "] + leg.dropoffLocation.zip

    //creating purpleRequested border
    
    if (leg.purpleRequested) 
    { border = 'border-purple-500'}
    else
    { border = 'border-gray-900'}
    
    // Inserting HTML

    outputElement.insertAdjacentHTML('beforeend',`
      <div class="border-4 ${border} p-4 my-4 text-left">
        <div class="flex">
          <div class="w-1/2">
            <h2 class="text-2xl py-1">${PassengerName}</h2>
            <p class="font-bold text-gray-600">${phone}</p>
          </div>
          <div class="w-1/2 text-right">
            <span class="rounded-xl bg-gray-600 text-white p-2">
            ${passengers} passengers
            </span>
          </div>
        </div>
          <div class="mt-4 flex">
            <div class="w-1/2">
            <div class="text-sm font-bold text-gray-600">PICKUP</div>
            <p>${pickupLine1}</p>
            <p>${pickupLine2}</p>
            </div>
           <div class="w-1/2">
            <div class="text-sm font-bold text-gray-600">DROPOFF</div>
            <p>${dropoffLine1}</p>
            <p>${dropoffLine2}</p>
            </div>
           </div>
      </div>  
       `)
        }
      }


        
    }

window.addEventListener('DOMContentLoaded', pageLoaded)

