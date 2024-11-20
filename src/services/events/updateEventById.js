// import eventData from "../../data/events.json" assert { type: "json" };

// const updateEventById = (id, updatedEvent) => {
//   const eventIndex = eventData.events.findIndex((event) => event.id === id);

//   if (eventIndex === -1) {
//     return null;
//   }

//   const {
//     title,
//     description,
//     location,
//     image,
//     startTime,
//     endTime,
//     createdBy,
//     categoryIds,
//   } = updatedEvent;

//   eventData.events[eventIndex] = {
//     ...eventData.events[eventIndex],
//     title: title || eventData.events[eventIndex].title,
//     description: description || eventData.events[eventIndex].description,
//     location: location || eventData.events[eventIndex].location,
//     image: image || eventData.events[eventIndex].image,
//     startTime: startTime || eventData.events[eventIndex].startTime,
//     endTime: endTime || eventData.events[eventIndex].endTime,
//     createdBy: createdBy || eventData.events[eventIndex].createdBy,
//     categoryIds: categoryIds || eventData.events[eventIndex].categoryIds,
//   };

//   return eventData.events[eventIndex];
// };

// export default updateEventById;


import { PrismaClient } from '@prisma/client'
import NotFoundError from '../../errors/NotFoundError.js'

const updateEventById = async (id, title, description, location, image, startTime, endTime, createdBy, categoryIds) => {
  const prisma = new PrismaClient()
  const updatedEvent = await prisma.event.updateMany({ // update 0 or more events
    where: {
      id
    },
    data: {
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds
    }
  })

  if (!updatedEvent || updatedEvent.count === 0) {
    throw new NotFoundError('Event', id)
  }

  return {
    message: `Event with id ${id} was updated!` // we don't return the updated event because updateMany doesn’t return anything other than the count of the updated objects
  }
}

export default updateEventById

