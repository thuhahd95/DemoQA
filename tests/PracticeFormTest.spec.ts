import { expect, test} from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage.js';
import { ThanksForSubmitPage } from '../pages/ThanksForSubmitPage.js';
test.describe('Practice Form Test', () => {
    let practiceFormPage: PracticeFormPage;
    let thanksForSubmitPage: ThanksForSubmitPage;
    test.beforeEach(async ({page}) => {
        practiceFormPage = new PracticeFormPage(page);
        thanksForSubmitPage = new ThanksForSubmitPage(page);
        await practiceFormPage.goTo();
    });

    test('Submit data successfully', async () => {
        const firstName: string = 'Thu';
        const lastName: string = 'Hà';
        const email: string = 'thuha@gmail.com';   
        const gender: string = 'Male';
        const mobile: string = '0123456789';
        const dateOfBirth: string = '01 January,2000';
        const subject: string = 'Maths, Physics, Chemistry';
        const hobbies: string = 'Sports, Reading, Music';
        const picture: string = 'image_sample.jpg';
        const currentAddress: string = '123 Main St';
        const state: string = 'NCR';
        const city: string = 'Delhi';
        await practiceFormPage.inputData(firstName, lastName, email, gender, mobile, dateOfBirth, subject, hobbies, picture, currentAddress, state, city);
        const actualStudentName: string = await thanksForSubmitPage.getValueByLabel(thanksForSubmitPage.lblValue, 'Student Name');
        const expectedStudentName: string = firstName + ' ' + lastName;
        expect(actualStudentName).toBe(expectedStudentName);
        
        const actualStudentEmail: string = await thanksForSubmitPage.getValueByLabel(thanksForSubmitPage.lblValue, 'Student Email');
        expect(actualStudentEmail).toBe(email);

        const actualGender: string = await thanksForSubmitPage.getValueByLabel(thanksForSubmitPage.lblValue, 'Gender');
        expect(actualGender).toBe(gender);

        const actualMobile: string = await thanksForSubmitPage.getValueByLabel(thanksForSubmitPage.lblValue, 'Mobile');
        expect(actualMobile).toBe(mobile);

        const actualDateOfBirth: string = await thanksForSubmitPage.getValueByLabel(thanksForSubmitPage.lblValue, 'Date of Birth');
        const firstSpace = dateOfBirth.indexOf(" ");
        const secondSpace = dateOfBirth.indexOf(" ", firstSpace + 1);
        const expectedDateOfBirth = dateOfBirth.replace(dateOfBirth[secondSpace], ",");
        expect(actualDateOfBirth).toBe(expectedDateOfBirth);

        const actualSubjects: string = await thanksForSubmitPage.getValueByLabel(thanksForSubmitPage.lblValue, 'Subjects');
        expect(actualSubjects).toBe(subject);

        const actualHobbies: string = await thanksForSubmitPage.getValueByLabel(thanksForSubmitPage.lblValue, 'Hobbies');
        expect(actualHobbies).toBe(hobbies);

        const actualPicture: string = await thanksForSubmitPage.getValueByLabel(thanksForSubmitPage.lblValue, 'Picture');
        expect(actualPicture).toBe(picture);

        const actualAddress: string = await thanksForSubmitPage.getValueByLabel(thanksForSubmitPage.lblValue, 'Address');
        expect(actualAddress).toBe(currentAddress);

        const actualStateAndCity: string = await thanksForSubmitPage.getValueByLabel(thanksForSubmitPage.lblValue, 'State and City');
        const expectedStateAndCity: string = state + ' ' + city;
        expect(actualStateAndCity).toBe(expectedStateAndCity);  


    });
});