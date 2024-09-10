import { http, HttpResponse } from "msw";
import { dummyData } from '../data';


export const handlers = [
    http.get('/api/dummy_data', () => {
        return HttpResponse.json(dummyData);
    }),
];