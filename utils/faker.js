import { faker } from "@faker-js/faker";

export const generateCheckoutData = () => {
  return {
    email: faker.internet.email(),
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    zipcode: faker.location.zipCode(),
    houseNumber: faker.location.buildingNumber()
  }
}