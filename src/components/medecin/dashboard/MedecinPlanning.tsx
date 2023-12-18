import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from "../../interface/CalendarEvent";
import { getAllSejourByMedecin, Sejour } from "../../../service_api/sejour_service";
import {dividerClasses} from "@mui/material";

const localizer = momentLocalizer(moment);

interface MedecinPlanningProps {
    medecinId: number;
}

const MedecinPlanning: React.FC<MedecinPlanningProps> = ({ medecinId }) => {
    let [events, setEvents] = useState<CalendarEvent[]>([]);

    const [calendarHeight, setCalendarHeight] = useState(window.innerHeight - 100); // Ajustez 100 selon vos besoins pour d'autres éléments de l'interface
    const [calendarWidth, setCalendarWidth] = useState(window.innerWidth - 100); // Ajustez 100 selon vos besoins pour d'autres éléments de l'interface

    useEffect(() => {
        const handleResize = () => {
            setCalendarHeight(window.innerHeight - 100); // Même ajustement ici
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchSejours = async () => {
            try {
                const sejours: Sejour[] = await getAllSejourByMedecin(medecinId);
                const transformedEvents = transformSejoursToEvents(sejours);
                setEvents(transformedEvents);
            } catch (error) {
                console.error("Erreur lors de la récupération des séjours: ", error);
            }
        };

        fetchSejours();
    }, [medecinId]);

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: `${calendarHeight}px`, width: `${calendarWidth}px` }}
            />
        </div>
    );
};

export default MedecinPlanning;

const transformSejoursToEvents = (sejours: Sejour[]): CalendarEvent[] => {
    return sejours.map(sejour => ({
        start: new Date(sejour.dateDebut),
        end: new Date(sejour.dateFin),
        title: `${sejour.speciality}: ${sejour.motif}`,
    }));
};
