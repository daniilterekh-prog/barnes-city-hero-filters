(() => {
  const quickList = document.querySelector('.quick-links ul')
  const quickMore = document.querySelector('.quick-links__more')
  quickMore?.addEventListener('click', () => {
    const expanded = quickMore.getAttribute('aria-expanded') === 'true'
    quickMore.setAttribute('aria-expanded', String(!expanded))
    quickMore.textContent = expanded ? 'Показать все' : 'Скрыть'
    quickList?.querySelectorAll('li').forEach((item, index) => { if (index >= 9) item.classList.toggle('is-hidden', expanded) })
  })

  const icon = document.querySelector('.hero-filters__filter-icon')
  const modal = document.querySelector('.filter-modal')
  if (modal) document.body.append(modal)
  const close = modal?.querySelector('.filter-modal__close')
  const backdrop = modal?.querySelector('.filter-modal__backdrop')
  const apply = modal?.querySelector('.filter-modal__apply')
  const reset = modal?.querySelector('.filter-modal__reset')
  const setOpen = (open) => {
    if (!modal || !icon) return
    modal.hidden = !open
    modal.setAttribute('aria-hidden', String(!open))
    icon.setAttribute('aria-expanded', String(open))
    document.body.classList.toggle('modal-open', open)
    if (open) close?.focus()
    else icon.focus()
  }
  icon?.addEventListener('click', () => setOpen(icon.getAttribute('aria-expanded') !== 'true'))
  close?.addEventListener('click', () => setOpen(false))
  backdrop?.addEventListener('click', () => setOpen(false))
  apply?.addEventListener('click', () => setOpen(false))
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal && !modal.hidden) setOpen(false) })

  const check = (label, value) => `<label class="filter-option"><input type="checkbox" value="${value}" /><span>${label}</span></label>`
  const rooms = Array.from({ length: 13 }, (_, i) => i + 1)
  const districts = ['Академический', 'Алексеевский', 'Арбат', 'Аэропорт', 'Басманный', 'Беговой', 'Бутырский', 'Войковский', 'Гагаринский', 'Головинский', 'Даниловский', 'Донской', 'Дорогомилово', 'Замоскворечье', 'Красносельский', 'Крылатское', 'Кунцево', 'Левобережный', 'Ломоносовский', 'Марфино', 'Марьина Роща', 'Мещанский', 'Митино', 'Можайский', 'Обручевский', 'Очаково-матвеевское', 'Покровское-Стрешнево', 'Пресненский', 'Проспект Вернадского', 'Раменки', 'Савёловский', 'Свиблово', 'Сокол', 'Сокольники', 'Строгино', 'Таганский', 'Тверской', 'Тропарёво-Никулино', 'Филевский парк', 'Фили-Давыдково', 'Хамовники', 'Хорошёво-Мнёвники', 'Хорошёвский', 'Щукино', 'Южнопортовый', 'Якиманка']
  const groups = [
    { title: 'Тип недвижимости', kind: 'chips', options: [['Апартаменты', 'apartment'], ['Квартира', 'shop'], ['Квартира в новостройке', 'new_moscow'], ['Пентхаус', 'penthouse']] },
    { title: 'Цена ₽', kind: 'range', placeholders: ['от 9 550 000 ₽', 'до 2 185 036 900 ₽'] },
    { title: 'Диапазоны', kind: 'chips', options: [['до 50 млн ₽', '50m'], ['50 – 100 млн ₽', '50-100m'], ['100 – 200 млн ₽', '100-200m'], ['от 200 млн ₽', '200m+']] },
    { title: 'Общая площадь', kind: 'range', placeholders: ['от 0 м²', 'до 1 846 м²'] },
    { title: 'Комнаты', kind: 'chips', options: rooms.map((room) => [String(room), `APPARTAMENTS:${room}`]) },
    { title: 'Районы', kind: 'districts', options: districts.map((district) => [district, `AREAS:${district}`]) },
    { title: 'Отделка', kind: 'switch' }, { title: 'Лифт', kind: 'switch' }, { title: 'Трофейная недвижимость', kind: 'switch' },
  ]
  const groupMarkup = (group) => {
    if (group.kind === 'range') return `<section class="filter-group"><h3>${group.title}</h3><div class="filter-range"><input type="text" inputmode="numeric" placeholder="${group.placeholders[0]}" /><input type="text" inputmode="numeric" placeholder="${group.placeholders[1]}" /></div></section>`
    if (group.kind === 'switch') return `<section class="filter-group filter-group--switch"><label class="filter-switch"><input type="checkbox" /><span></span><b>${group.title}</b></label></section>`
    const options = group.options.map(([label, value]) => check(label, value)).join('')
    return `<section class="filter-group"><h3>${group.title}</h3><div class="filter-options ${group.kind === 'districts' ? 'filter-options--districts' : 'filter-options--chips'}">${options}</div></section>`
  }
  document.querySelector('[data-filter-groups]').innerHTML = groups.map(groupMarkup).join('')
  reset?.addEventListener('click', () => modal?.querySelectorAll('input').forEach((input) => {
    if (input.type === 'checkbox') input.checked = false
    else input.value = ''
  }))
  document.querySelector('.hero-filters__bar')?.addEventListener('submit', (event) => event.preventDefault())
})()
