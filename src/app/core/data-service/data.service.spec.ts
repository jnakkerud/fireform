import { totalGrade } from './data.service';
import { GradeResponse } from '../collection-service/collection.service';

const GR: GradeResponse[] = [
    {
        field: 'field1',
        points: [
            {
                point: 1,
                value: 'red'
            },
            {
                point: 3,
                value: 'green'
            }
        ]
    },
    {
        field: 'field2',
        points: [
            {
                point: 2,
            }
        ]
    },
    {
        field: 'field3',
        points: [
            {
                point: 0
            },
            {
                point: 5
            }
        ]
    }
];

describe('DataService', () => {

    it('#totalGrade should return a total', (done: DoneFn) => {
        totalGrade(GR).subscribe(value => {
            expect(value).toBe(10);
            done();
        });
    });
});


