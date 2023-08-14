export const weekNumberOfDate = (dateString) => {
    const dateObj = new Date(dateString);
    const start = new Date(dateObj.getFullYear(), 0, 1);
    const diff = (dateObj - start + (start.getUTCDay() === 1 ? 0 : 86400000)) / 86400000;
    return Math.ceil(diff / 7);
}

export const add30Minutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(str => parseInt(str, 10));
    let date = new Date(2000, 0, 1, hours, minutes); 
    date.setMinutes(date.getMinutes() + 30);
    const resultHours = String(date.getHours()).padStart(2, '0');
    const resultMinutes = String(date.getMinutes()).padStart(2, '0');
    return `${resultHours}:${resultMinutes}`;
}

export const obtainYearStringYYYYMMDD = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
}

export const getStartAndEndDate = (selectDay, startHour, endHour) =>{
    const daysOfWeek = {
        'sunday': 0,
        'monday': 1,
        'tuesday': 2,
        'wednesday': 3,
        'thursday': 4,
        'friday': 5,
        'saturday': 6
    };

    // Obtener la fecha actual
    const currentDate = new Date();

    // Calcular la diferencia entre el día actual y el día seleccionado
    const dayDifference = daysOfWeek[selectDay] - currentDate.getDay();

    // Ajustar la fecha actual al día seleccionado
    currentDate.setDate(currentDate.getDate() + dayDifference);

    // Establecer la hora de inicio
    const [startHourPart, startMinutePart] = startHour.split(':').map(Number);
    if (isNaN(startHourPart) || isNaN(startMinutePart)) {
        console.log("Valor problemático:", startHour);
        throw new Error('Formato de hora de inicio no válido.');
    }
    
    currentDate.setHours(startHourPart, startMinutePart, 0, 0);
    const startDate = new Date(currentDate);

    // Establecer la hora de finalización
    const [endHourPart, endMinutePart] = endHour.split(':').map(Number);
    if (isNaN(endHourPart) || isNaN(endMinutePart)) {
        console.log("Valor problemático:", endHour);
        throw new Error('Formato de hora de finalización no válido.');
    }
    currentDate.setHours(endHourPart, endMinutePart, 0, 0);
    const endDate = new Date(currentDate);

    return {
        startDate: startDate,
        endDate: endDate
    };
}


