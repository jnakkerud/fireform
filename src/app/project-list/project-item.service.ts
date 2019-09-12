import { Injectable } from '@angular/core';

export interface ProjectItem {
    id: string;
    name: string;
    description: string;
}

const PROJECTS: ProjectItem[] = [
    {
        id: '1',
        name: 'First Project',
        description: 'This is the first project'
    },
    {
        id: '2',
        name: 'Second Project',
        description: 'This is the second project'

    },
    {
        id: '3',
        name: 'Thrid Project',
        description: 'This is the second project'

    },
    {
        id: '4',
        name: 'Fourth Project',
        description: 'This is the second project'

    },
    {
        id: '5',
        name: '5 Project',
        description: 'This is the second project'

    },
    {
        id: '6',
        name: '6 Project',
        description: 'This is the second project'

    }
];

@Injectable()
export class ProjectItemService {
    getProjects(): ProjectItem[] {
        return PROJECTS;
      }
}
